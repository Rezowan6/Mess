import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-theme-md bg-theme-skeleton",
        className,
      )}
    >
      <div
        className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_1.6s_infinite]
          bg-linear-to-r
          from-transparent
          via-theme-brand-soft
          to-transparent
        "
      />
    </div>
  );
};
