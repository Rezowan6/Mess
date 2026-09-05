import { MealPreferenceSkeleton } from "@/modules/meal-preference/components/MealPreferenceSkeleton";
import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MealRequestHistorySkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-2 py-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-64" />
      </div>

      {/*  */}
      <MealPreferenceSkeleton />
      {/* Request list */}
      <div className="h-125 overflow-hidden bg-info/5 px-4">
        <div className="divide-y divide-success/40">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-3 px-4 py-4">
              {/* Avatar */}
              <Skeleton className="h-12 w-12 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-2">
                {/* Name + status */}
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                {/* Meal badges */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-md" />
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-6 w-20 rounded-md" />
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
