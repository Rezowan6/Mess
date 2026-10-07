import type { CSSProperties } from "react";

import clsx from "clsx";

import { Skeleton } from "./Skeleton";

interface FinancialSummarySkeletonProps {
  /** Number of cells. Defaults to 4. */
  cells?: number;
  /** Show the second skeleton line under the value (used when cells have a hint). */
  showHint?: boolean;
  className?: string;
}

const CELLS_PER_PAGE = 2;

export const FinancialSummarySkeleton = ({
  cells = 4,
  showHint = false,
  className,
}: FinancialSummarySkeletonProps) => {
  const pages = Math.ceil(cells / CELLS_PER_PAGE);

  return (
    <div
      aria-busy="true"
      className={clsx(
        "overflow-hidden rounded-theme-md shadow-theme-sm",
        className,
      )}
    >
      <div
        style={{ "--cols": cells } as CSSProperties}
        className="-mb-px -mr-px flex overflow-hidden p-2 lg:grid lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
      >
        {Array.from({ length: cells }, (_, index) => (
          <div key={index} className="w-1/2 min-w-0 shrink-0 lg:w-auto">
            <div className="relative h-full overflow-hidden border-r border-theme-border px-3 py-3 sm:px-4">
              {/* Title: dot + label */}
              <div className="flex items-center gap-1.5">
                <Skeleton className="size-1.5 shrink-0 rounded-full" />
                <Skeleton className="h-3.5 w-20" />
              </div>

              {/* Value */}
              <Skeleton className="mt-1 h-5 w-24" />
              <Skeleton className="mt-1 h-2 w-24" />

              {showHint && <Skeleton className="mt-1 h-2 w-24" />}
            </div>
          </div>
        ))}
      </div>

      {/* Page dots (small screens only) */}
      {pages > 1 && (
        <div className="flex justify-center gap-1.5 py-2 lg:hidden">
          {Array.from({ length: pages }, (_, index) => (
            <Skeleton
              key={index}
              className={
                index === 0
                  ? "h-1.5 w-5 rounded-full"
                  : "h-1.5 w-1.5 rounded-full"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
