// MealPreferenceSkeleton.tsx

import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MealPreferenceSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-64" />

        <Skeleton className="h-3 w-80" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between overflow-hidden bg-info/5 border-b border-info/40 p-3"
          >
            <Skeleton className="h-5 w-24" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-md" />

              <Skeleton className="h-6 w-8" />

              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-10 w-36 rounded-md" />
    </div>
  );
};
