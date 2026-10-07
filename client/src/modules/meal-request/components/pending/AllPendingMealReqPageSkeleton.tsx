import { Skeleton } from "@/shared/components/feedback/Skeleton";

const ROWS = [1, 2, 3, 4, 5];

export const AllPendingMealReqPageSkeleton = () => {
  return (
    <div className="overflow-hidden">
      {ROWS.map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 border-b border-theme-border px-2 py-4"
        >
          <Skeleton className="size-10 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
};
