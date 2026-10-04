import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutoSliderOptions {
  enabled?: boolean;
  /** Time between automatic slides (ms) */
  interval?: number;
  /** How long auto sliding stays paused after the user touches the slider (ms) */
  resumeDelay?: number;
}

export const useAutoSlider = ({
  enabled = true,
  interval = 3500,
  resumeDelay = 6000,
}: UseAutoSliderOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);

  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + resumeDelay;
  }, [resumeDelay]);

  // Count the pages and find the current one
  const measure = useCallback(() => {
    const el = ref.current;

    if (!el || el.clientWidth === 0) return;

    // 0.05 absorbs sub-pixel rounding (1.0000001 must not become 2 pages)
    const total = Math.max(
      1,
      Math.ceil(el.scrollWidth / el.clientWidth - 0.05),
    );
    const current = Math.min(
      total - 1,
      Math.round(el.scrollLeft / el.clientWidth),
    );

    setPages(total);
    setActivePage(current);
  }, []);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    measure();

    el.addEventListener("scroll", measure, { passive: true });

    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  // Automatic sliding: next page, and back to the first page at the end
  useEffect(() => {
    if (!enabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      const el = ref.current;

      if (!el) return;

      if (document.hidden || hovering.current) return;

      if (Date.now() < pausedUntil.current) return;

      // Nothing to slide (for example the desktop grid)
      if (el.scrollWidth <= el.clientWidth + 1) return;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      el.scrollTo({
        left: atEnd ? 0 : el.scrollLeft + el.clientWidth,
        behavior: "smooth",
      });
    }, interval);

    return () => window.clearInterval(id);
  }, [enabled, interval]);

  const goToPage = useCallback(
    (page: number) => {
      const el = ref.current;

      if (!el) return;

      pause();
      el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
    },
    [pause],
  );

  // Spread these on the scroller element
  const handlers = {
    onPointerDown: pause,
    onWheel: pause,
    onFocus: pause,
    onMouseEnter: () => {
      hovering.current = true;
    },
    onMouseLeave: () => {
      hovering.current = false;
    },
  };

  return { ref, pages, activePage, goToPage, handlers };
};
