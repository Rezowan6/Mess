import { Skeleton } from "@/shared/components/feedback/Skeleton";

const SUMMARY_CELLS = 5;
const LIST_ROWS = 3;

const OverviewListCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl p-4 shadow-lg shadow-info/20">
      {/* Title + description */}
      <div className="mb-5 space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-52 max-w-full" />
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {Array.from({ length: LIST_ROWS }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-info/10 p-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />

              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-info/30 pt-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};

export const MyProfileOverviewSkeleton = () => {
  return (
    <div
      className="space-y-6"
      aria-busy="true"
      aria-label="Loading profile overview"
    >
      {/* Financial summary */}
      <div className="overflow-hidden rounded-xl  shadow-lg shadow-info/20">
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: SUMMARY_CELLS }, (_, index) => (
            <div
              key={index}
              className="space-y-2 px-3 py-3 sm:px-4 max-lg:[&:last-child:nth-child(odd)]:col-span-2"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Meal breakdown + Recent deposits */}
      <div className="grid gap-6 lg:grid-cols-2">
        <OverviewListCardSkeleton />
        <OverviewListCardSkeleton />
      </div>
    </div>
  );
};
