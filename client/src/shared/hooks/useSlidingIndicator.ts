import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface IndicatorState {
  left: number;
  width: number;
  ready: boolean;
}

interface UseSlidingIndicatorOptions {
  activeKey: string | undefined;
  itemCount: number;
}

export const useSlidingIndicator = ({
  activeKey,
  itemCount,
}: UseSlidingIndicatorOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  const [indicator, setIndicator] = useState<IndicatorState>({
    left: 0,
    width: 0,
    ready: false,
  });

  // Returns a ref callback for the item with the given key
  const setItemRef = useCallback(
    (key: string) => (el: HTMLElement | null) => {
      itemRefs.current[key] = el;
    },
    [],
  );

  // Measure the active item and move the indicator under it
  useLayoutEffect(() => {
    const measure = () => {
      const el = activeKey ? itemRefs.current[activeKey] : null;

      // No active item: collapse the indicator
      if (!el) {
        setIndicator((prev) =>
          prev.width === 0 ? prev : { ...prev, width: 0 },
        );
        return;
      }

      setIndicator((prev) =>
        prev.left === el.offsetLeft && prev.width === el.offsetWidth
          ? prev
          : { left: el.offsetLeft, width: el.offsetWidth, ready: true },
      );
    };

    measure();

    const observer = new ResizeObserver(measure);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [activeKey, itemCount]);

  // Keep the active item visible on small screens
  useEffect(() => {
    if (!activeKey) return;

    itemRefs.current[activeKey]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeKey]);

  return { containerRef, setItemRef, indicator };
};
