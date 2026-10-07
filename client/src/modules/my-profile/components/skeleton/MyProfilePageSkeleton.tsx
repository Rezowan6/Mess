import { useLocation } from "react-router-dom";

import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { getMyProfilePageConfig } from "../../configs/myProfile.page.config";
import { MyProfileOverviewSkeleton } from "./MyProfileOverviewSkeleton";

const TAB_COUNT = 4;

export const MyProfilePageSkeleton = () => {
  const location = useLocation();

  const currentPage = getMyProfilePageConfig(location.pathname);

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="rounded-theme-xl border border-theme-border bg-theme-card p-5 shadow-theme-lg">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <Skeleton className="h-20 w-20 shrink-0 rounded-full" />

            <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-2 sm:items-start">
              <Skeleton className="h-7 w-48 max-w-full" />
              <Skeleton className="h-4 w-56 max-w-full" />

              <div className="mt-1 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Route tabs */}
        <div className="mb-3 flex w-fit max-w-full gap-1 overflow-hidden rounded-full bg-theme-success-soft p-1">
          {Array.from({ length: TAB_COUNT }, (_, index) => (
            <Skeleton
              key={index}
              className="h-10 w-20 shrink-0 rounded-full sm:w-24"
            />
          ))}
        </div>
      </div>

      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
      >
        <MyProfileOverviewSkeleton />
      </ManagementPage>
    </>
  );
};
