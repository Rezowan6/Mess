import { Skeleton } from "@/shared/components/feedback/Skeleton";

const SUMMARY_CARDS = [1, 2, 3, 4, 5, 6];

export const TodayMealEntrySummarySkeleton = () => {
  return (
    <div aria-busy="true" className="grid grid-cols-2 gap-4 md:grid-cols-6">
      {SUMMARY_CARDS.map((item) => (
        <div
          key={item}
          className="relative overflow-hidden rounded-theme-xl border border-theme-border bg-theme-card p-2 shadow-theme-md"
        >
          <div className="relative flex items-center gap-4">
            {/* Icon box */}
            <Skeleton className="h-12 w-12 shrink-0 rounded-theme-lg" />

            <div className="min-w-0 flex-1">
              {/* Title */}
              <Skeleton className="h-3 w-16" />

              {/* Value */}
              <Skeleton className="mt-2 h-6 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
