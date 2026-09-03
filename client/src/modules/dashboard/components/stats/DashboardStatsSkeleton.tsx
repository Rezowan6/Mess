import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="rounded-md border border-base-300 bg-background p-4 shadow-sm"
        >
          <Skeleton className="mb-3 h-4 w-28" />
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
};
