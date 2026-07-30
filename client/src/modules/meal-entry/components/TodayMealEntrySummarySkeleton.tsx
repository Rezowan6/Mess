import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const TodayMealEntrySummarySkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="card bg-base-100 shadow border border-primary rounded-md"
        >
          <div className="card-body items-center text-center p-4 gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />

            <Skeleton className="h-4 w-10" />

            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};