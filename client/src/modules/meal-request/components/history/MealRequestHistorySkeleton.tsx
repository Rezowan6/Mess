import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MealRequestHistorySkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-2 py-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-64" />
      </div>

      {/* Request list */}
      <div className="h-125 overflow-hidden px-4">
        <div className="divide-y divide-theme-border">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-3 px-4 py-4">
              {/* Avatar */}
              <Skeleton className="h-12 w-12 shrink-0 rounded-theme-xl" />

              <div className="min-w-0 flex-1 space-y-2">
                {/* Name + status */}
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                {/* Meal badges */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-theme-sm" />
                  <Skeleton className="h-6 w-20 rounded-theme-sm" />
                  <Skeleton className="h-6 w-20 rounded-theme-sm" />
                </div>

                {/* Date */}
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};