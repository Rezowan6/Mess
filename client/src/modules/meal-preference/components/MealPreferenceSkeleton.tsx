import { Skeleton } from "@/shared/components/feedback/Skeleton";

const MEAL_ROWS = [1, 2, 3];

export const MealPreferenceSkeleton = () => {
  return (
    <div aria-busy="true" className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-64" />

        <Skeleton className="h-3 w-80" />
      </div>

      <div className="space-y-3">
        {MEAL_ROWS.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between overflow-hidden border-b border-theme-border p-3"
          >
            <Skeleton className="h-5 w-24" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-theme-md" />

              <Skeleton className="h-6 w-8" />

              <Skeleton className="h-10 w-10 rounded-theme-md" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-10 w-36 rounded-full" />
    </div>
  );
};