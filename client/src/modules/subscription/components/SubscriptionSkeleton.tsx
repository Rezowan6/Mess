import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const SubscriptionSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Subscription Overview */}
      <div className="rounded-2xl bg-success/20 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-xl" />

            <div className="space-y-2">
              <Skeleton className="h-7 w-56" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
          </div>

          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="rounded-xl border border-info p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>

              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Current Plan + Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>

            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 max-w-full" />

            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-28" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Expiry Alert */}
          <div className="rounded-xl border border-info p-5 space-y-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Upgrade Button */}
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-info p-6">
        <Skeleton className="h-6 w-40" />

        <div className="mt-6 space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-64 max-w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
