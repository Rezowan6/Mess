import { useEffect, useRef, useState } from "react";

export const useCountUp = (target: number, duration = 1800) => {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    // Animate from the last shown value, so realtime updates feel smooth
    const from = fromRef.current;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = from + (target - from) * eased;

      fromRef.current = current;
      setValue(current);

      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return value;
};
