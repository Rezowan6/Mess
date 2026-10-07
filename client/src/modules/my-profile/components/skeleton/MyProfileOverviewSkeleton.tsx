import { FinancialSummarySkeleton } from "@/shared/components/feedback/FinancialSummarySkeleton";
import { Skeleton } from "@/shared/components/feedback/Skeleton";

const LIST_ROWS = 3;

const OverviewListCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-theme-xl p-4 shadow-theme-lg">
      {/* Title + description */}
      <div className="mb-5 space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-52 max-w-full" />
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {Array.from({ length: LIST_ROWS }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between  p-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-theme-md" />

              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-theme-border pt-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};

export const MyProfileOverviewSkeleton = () => {
  return (
    <div
      className="space-y-6"
      aria-busy="true"
      aria-label="Loading profile overview"
    >
      {/* Financial summary */}
      <FinancialSummarySkeleton cells={4} />

      {/* Meal breakdown + Recent deposits */}
      <div className="grid gap-6 lg:grid-cols-2">
        <OverviewListCardSkeleton />
        <OverviewListCardSkeleton />
      </div>
    </div>
  );
};
