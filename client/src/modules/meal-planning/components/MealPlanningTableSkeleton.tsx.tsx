import { Skeleton } from "@/shared/components/feedback/Skeleton";

const ROWS = [1, 2, 3, 4, 5];

export const MealPlanningTableSkeleton = () => {
  return (
    <div aria-busy="true" className="space-y-3">
      {ROWS.map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 rounded-theme-md border border-theme-border bg-theme-card p-3"
        >
          <Skeleton className="size-10 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>

          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
};