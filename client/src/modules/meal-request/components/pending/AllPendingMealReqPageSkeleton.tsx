import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const AllPendingMealReqPageSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />

      <div className="overflow-hidden rounded-md bg-info/5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 border-b border-base-content/10 px-2 py-4"
          >
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>

            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};