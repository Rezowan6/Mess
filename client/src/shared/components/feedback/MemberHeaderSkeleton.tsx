import clsx from "clsx";

import { Skeleton } from "./Skeleton";

interface MemberHeaderSkeletonProps {
  /** Static subtitle text. If omitted, a skeleton line is shown instead. */
  subtitle?: string;
  /** Static label above the right value (e.g. "Total Deposit"). Hidden when omitted. */
  rightLabel?: string;
  /** Show the right-side block. Defaults to true. */
  showRight?: boolean;
  className?: string;
}

export const MemberHeaderSkeleton = ({
  subtitle,
  rightLabel,
  showRight = true,
  className,
}: MemberHeaderSkeletonProps) => {
  return (
    <div
      aria-busy="true"
      className={clsx("flex items-center justify-between gap-4", className)}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 shrink-0 rounded-theme-xl" />

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />

          {subtitle ? (
            <p className="text-sm text-theme-text-muted">{subtitle}</p>
          ) : (
            <Skeleton className="h-3 w-24" />
          )}
        </div>
      </div>

      {showRight && (
        <div className="ml-auto flex flex-col items-end gap-1.5">
          {rightLabel && (
            <p className="text-xs text-theme-text-muted">{rightLabel}</p>
          )}
          <Skeleton className="h-5 w-24" />
        </div>
      )}
    </div>
  );
};
