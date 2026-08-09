import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MealSettingManageSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />

        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      <div className="rounded-xl border border-accent p-6">
        <div className="space-y-5 flex justify-between">
          <div className="grid gap-4 md:grid-cols-2">

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
