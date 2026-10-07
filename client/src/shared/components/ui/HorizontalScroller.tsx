import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

import { cn } from "@/shared/utils/cn";

interface HorizontalScrollerProps {
  children: ReactNode;
  /** Set the visible width here, e.g. "w-56 sm:w-72 lg:w-96" */
  className?: string;
  /** Gap between items */
  gapClassName?: string;
}

const DRAG_THRESHOLD = 5;

export const HorizontalScroller = ({
  children,
  className,
  gapClassName = "gap-2",
}: HorizontalScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollRef.current;

    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    updateEdges();

    el.addEventListener("scroll", updateEdges, { passive: true });

    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, [updateEdges]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  };

  // Mouse drag only. Touch screens already scroll natively.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: scrollRef.current?.scrollLeft ?? 0,
      moved: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;

    if (!drag.current.active || !el) return;

    const deltaX = event.clientX - drag.current.startX;

    if (!drag.current.moved && Math.abs(deltaX) > DRAG_THRESHOLD) {
      drag.current.moved = true;
      setIsDragging(true);
      // Capture only after a real drag, otherwise button clicks would be retargeted
      el.setPointerCapture(event.pointerId);
    }

    if (drag.current.moved) {
      el.scrollLeft = drag.current.startScroll - deltaX;
    }
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;

    drag.current.active = false;
    setIsDragging(false);

    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  };

  // After a drag, swallow the click so no button is pressed by accident
  const handleClickCapture = (event: React.MouseEvent) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className={cn("group relative", className)}>
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClickCapture={handleClickCapture}
        className={cn(
          "flex flex-nowrap overflow-x-auto overscroll-x-contain scrollbar-none [&::-webkit-scrollbar]:hidden",
          gapClassName,
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
        )}
      >
        {children}
      </div>

      {/* Edge fades */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-theme-background to-transparent transition-opacity duration-200",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-theme-background to-transparent transition-opacity duration-200",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Arrows (visible on hover, only when there is more to scroll) */}
      {canScrollLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByPage(-1)}
          className="absolute left-0 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-theme-surface-raised text-theme-text shadow-theme-md ring-1 ring-theme-border opacity-0 transition-all duration-200 hover:scale-110 hover:bg-theme-surface-hover group-hover:opacity-100"
        >
          <ChevronLeft size={14} />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByPage(1)}
          className="absolute right-0 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-theme-surface-raised text-theme-text shadow-theme-md ring-1 ring-theme-border opacity-0 transition-all duration-200 hover:scale-110 hover:bg-theme-surface-hover group-hover:opacity-100"
        >
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};
