import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MealTrendChartSkeleton = () => {
  return (
    <div className="rounded-md border border-base-300 bg-background p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />

          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>

        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>

      {/* Chart */}
      <div className="h-75 w-full">
        <div className="flex h-full items-end gap-3 px-4 pb-6">
          {[
            "h-[45%]",
            "h-[65%]",
            "h-[52%]",
            "h-[75%]",
            "h-[60%]",
            "h-[85%]",
            "h-[70%]",
            "h-[78%]",
          ].map((height, index) => (
            <Skeleton key={index} className={`flex-1 rounded-t-md ${height}`} />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center justify-between border-t border-base-200 pt-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>

        <div className="space-y-2 text-right">
          <Skeleton className="ml-auto h-3 w-24" />
          <Skeleton className="ml-auto h-6 w-12" />
        </div>
      </div>
    </div>
  );
};
