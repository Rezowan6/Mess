import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-md bg-base-300",
        className,
      )}
    >
      <div
        className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_1.6s_infinite]
          bg-gradient-to-r
          from-transparent
          via-teal-300/30
          to-transparent
        "
      />
    </div>
  );
};