import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

export const MyProfileInfoCardsSkeleton = () => {
  return (
    <ManagementPage
      title="My Profile"
      description="View your meal, deposit and balance information."
      footer={<Skeleton className="h-5 w-32" />}
    >
      <div className="space-y-6">
        {/* Monthly Meal Summary */}
        <div className="rounded-xl border border-info p-5">
          <Skeleton className="h-6 w-48" />

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Deposit Details Link */}
        <Skeleton className="h-5 w-36" />

        {/* Profile Info Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-info bg-background p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-3">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-7 w-20" />
                </div>

                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ManagementPage>
  );
};