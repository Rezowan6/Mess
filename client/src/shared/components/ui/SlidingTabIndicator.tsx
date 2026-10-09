import clsx from "clsx";

interface SlidingTabIndicatorProps {
  width: number;
  left: number;
  ready: boolean;
}

export const SlidingTabIndicator = ({
  width,
  left,
  ready,
}: SlidingTabIndicatorProps) => {
  return (
    <span
      aria-hidden="true"
      style={{
        width,
        transform: `translateX(${left}px)`,
      }}
      className={clsx(
        "pointer-events-none absolute inset-y-1 left-0 overflow-hidden rounded-full",
        "border border-white/25  backdrop-blur-lg",
        "shadow-[0_8px_24px_-6px_var(--theme-brand),inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-1px_0_rgb(0_0_0/0.12)]",
        "before:absolute before:inset-x-0 before:top-0 before:h-1/2",
        "before:rounded-t-full before:bg-linear-to-b before:from-white/35 before:to-transparent",
        "after:absolute after:inset-0 after:rounded-full",
        "after:bg-linear-to-br after:from-white/15 after:via-transparent after:to-black/10",
        ready
          ? "transition-[transform,width] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
          : "transition-none",
      )}
    />
  );
};
