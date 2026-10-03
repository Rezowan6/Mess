import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { Outlet, useLocation } from "react-router-dom";
import { MyProfileHeader } from "../components/MyProfileHeader";
import { MyProfileRouteTabs } from "../components/MyProfileRouteTabs";
import { MyProfilePageSkeleton } from "../components/skeleton/MyProfilePageSkeleton";
import { MY_PROFILE_MESSAGES } from "../configs/myProfile.messages";
import { getMyProfilePageConfig } from "../configs/myProfile.page.config";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyProfilePage = () => {
  const location = useLocation();

  const { data, isPending, isError, refetch } = useMyProfile();

  const profile = data?.data ?? null;

  const currentPage = getMyProfilePageConfig(location.pathname);

  if (isPending) {
    return <MyProfilePageSkeleton />;
  }

  // Show the error only when there is no cached data to display
  if (isError && !data) {
    const { title, description } = MY_PROFILE_MESSAGES.error;
    return (
      <ErrorState
        title={title}
        description={description}
        onRetry={() => refetch()}
      />
    );
  }

  if (!profile) {
    const { title, description } = MY_PROFILE_MESSAGES.empty;
    return <EmptyState title={title} description={description} />;
  }

  return (
    <>
      <div className="space-y-4">
        <MyProfileHeader member={profile.member} />

        <MyProfileRouteTabs />
      </div>

      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
      >
        <Outlet />
      </ManagementPage>
    </>
  );
};
