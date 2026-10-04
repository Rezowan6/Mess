import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutoSliderOptions {
  enabled?: boolean;
  /** Time between automatic slides (ms) */
  interval?: number;
  /** How long auto sliding stays paused after user interaction (ms) */
  resumeDelay?: number;
}

interface UseAutoSliderReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  pages: number;
  activePage: number;
  goToPage: (page: number) => void;
  handlers: {
    onPointerDown: () => void;
    onWheel: () => void;
    onFocusCapture: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

const DEFAULT_INTERVAL = 3500;
const DEFAULT_RESUME_DELAY = 6000;

const MIN_SCROLL_THRESHOLD = 1;
const PAGE_EPSILON = 0.05;

export const useAutoSlider = ({
  enabled = true,
  interval = DEFAULT_INTERVAL,
  resumeDelay = DEFAULT_RESUME_DELAY,
}: UseAutoSliderOptions = {}): UseAutoSliderReturn => {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Timestamp until which automatic sliding should remain paused.
   *
   * Using a timestamp instead of setTimeout avoids:
   * - unnecessary timers
   * - timer cleanup complexity
   * - stale callbacks
   */
  const pausedUntil = useRef(0);

  /**
   * Prevent auto-slide while mouse is over the slider.
   */
  const hovering = useRef(false);

  /**
   * Prevent auto-slide while the user is actively scrolling.
   */
  const interacting = useRef(false);

  /**
   * requestAnimationFrame ID used to avoid excessive state updates
   * during native scrolling.
   */
  const measureFrame = useRef<number | null>(null);

  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(0);

  /**
   * Pause automatic sliding after user interaction.
   */
  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + Math.max(0, resumeDelay);
  }, [resumeDelay]);

  /**
   * Calculate current page and total pages.
   *
   * This slider displays 2 cards per page on small screens,
   * but the calculation intentionally uses the actual scroll
   * container dimensions so it also works if the layout changes.
   */
  const measure = useCallback(() => {
    const el = ref.current;

    if (!el || el.clientWidth <= 0) {
      return;
    }

    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);

    /**
     * No horizontal overflow.
     *
     * This is important because on desktop your component becomes
     * a CSS grid.
     */
    if (maxScrollLeft <= MIN_SCROLL_THRESHOLD) {
      setPages(1);
      setActivePage(0);
      return;
    }

    /**
     * Calculate how many viewport-width pages exist.
     *
     * Small floating-point differences can otherwise create
     * an incorrect extra page.
     */
    const rawPages = el.scrollWidth / el.clientWidth;

    const totalPages = Math.max(1, Math.ceil(rawPages - PAGE_EPSILON));

    /**
     * Clamp scroll position before calculating active page.
     */
    const scrollLeft = Math.min(Math.max(0, el.scrollLeft), maxScrollLeft);

    let currentPage = Math.round(scrollLeft / el.clientWidth);

    /**
     * When we're very close to the end, explicitly consider
     * ourselves to be on the final page.
     */
    if (maxScrollLeft - scrollLeft <= MIN_SCROLL_THRESHOLD) {
      currentPage = totalPages - 1;
    }

    currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

    setPages((previous) => (previous === totalPages ? previous : totalPages));

    setActivePage((previous) =>
      previous === currentPage ? previous : currentPage,
    );
  }, []);

  /**
   * Schedule measurement with requestAnimationFrame.
   *
   * Native scroll events can fire many times per second.
   * Updating React state directly on every event is unnecessary.
   */
  const scheduleMeasure = useCallback(() => {
    if (measureFrame.current !== null) {
      return;
    }

    measureFrame.current = window.requestAnimationFrame(() => {
      measureFrame.current = null;
      measure();
    });
  }, [measure]);

  /**
   * Measure initial dimensions and react to:
   * - scrolling
   * - responsive layout changes
   * - container resizing
   */
  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    measure();

    const handleScroll = () => {
      interacting.current = true;
      pause();
      scheduleMeasure();
    };

    const handleScrollEnd = () => {
      interacting.current = false;
      scheduleMeasure();
    };

    el.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    /**
     * scrollend is supported in modern browsers.
     * A fallback isn't strictly necessary because auto-slide
     * is already protected by pause().
     */
    el.addEventListener("scrollend", handleScrollEnd);

    const resizeObserver = new ResizeObserver(() => {
      scheduleMeasure();
    });

    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("scrollend", handleScrollEnd);
      resizeObserver.disconnect();

      if (measureFrame.current !== null) {
        window.cancelAnimationFrame(measureFrame.current);
        measureFrame.current = null;
      }
    };
  }, [measure, pause, scheduleMeasure]);

  /**
   * Automatic sliding.
   */
  useEffect(() => {
    if (!enabled) {
      return;
    }

    /**
     * Respect user's accessibility preference.
     */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    /**
     * Invalid interval should never create a broken timer.
     */
    const safeInterval = Math.max(1000, interval);

    const id = window.setInterval(() => {
      const el = ref.current;

      if (!el) {
        return;
      }

      /**
       * Don't auto-slide when:
       * - browser tab is hidden
       * - mouse is over slider
       * - user is interacting
       * - user recently interacted
       */
      if (document.hidden) {
        return;
      }

      if (hovering.current) {
        return;
      }

      if (interacting.current) {
        return;
      }

      if (Date.now() < pausedUntil.current) {
        return;
      }

      /**
       * No horizontal overflow.
       *
       * This happens on desktop where FinancialSummary
       * becomes a CSS grid.
       */
      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      if (maxScrollLeft <= MIN_SCROLL_THRESHOLD) {
        return;
      }

      const currentScrollLeft = Math.max(0, el.scrollLeft);

      const atEnd =
        currentScrollLeft + el.clientWidth >=
        el.scrollWidth - MIN_SCROLL_THRESHOLD;

      const nextLeft = atEnd
        ? 0
        : Math.min(currentScrollLeft + el.clientWidth, maxScrollLeft);

      el.scrollTo({
        left: nextLeft,
        behavior: "smooth",
      });
    }, safeInterval);

    return () => {
      window.clearInterval(id);
    };
  }, [enabled, interval]);

  /**
   * Navigate directly to a page.
   */
  const goToPage = useCallback(
    (page: number) => {
      const el = ref.current;

      if (!el) {
        return;
      }

      /**
       * Always calculate the valid page range from
       * the current DOM state.
       */
      const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);

      if (maxScrollLeft <= MIN_SCROLL_THRESHOLD) {
        return;
      }

      const totalPages = Math.max(
        1,
        Math.ceil(el.scrollWidth / el.clientWidth - PAGE_EPSILON),
      );

      /**
       * Prevent invalid values such as:
       * goToPage(-1)
       * goToPage(999)
       */
      const safePage = Math.max(0, Math.min(page, totalPages - 1));

      const targetLeft = Math.min(safePage * el.clientWidth, maxScrollLeft);

      pause();

      el.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    },
    [pause],
  );

  /**
   * Event handlers exposed to the consuming component.
   */
  const handlers = {
    onPointerDown: pause,

    onWheel: pause,

    /**
     * onFocusCapture is more reliable than onFocus because
     * it also catches focus entering child elements.
     */
    onFocusCapture: pause,

    onMouseEnter: () => {
      hovering.current = true;
    },

    onMouseLeave: () => {
      hovering.current = false;
    },
  };

  return {
    ref,
    pages,
    activePage,
    goToPage,
    handlers,
  };
};
