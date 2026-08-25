import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Outlet, useLocation } from "react-router-dom";
import { MyProfileInfoCardsSkeleton } from "../components/MyProfileInfoCardsSkeleton";
import { MyProfileRouteTabs } from "../components/MyProfileRouteTabs";
import { MY_PROFILE_MESSAGES } from "../configs/myProfile.messages";
import { useMyProfile } from "../hooks/useMyProfile";
import { getMyProfilePageConfig } from "../configs/myProfile.page.config";

export const MyProfilePage = () => {
  const location = useLocation();

  const { data, isPending } = useMyProfile();

  const profile = data?.data;

  const currentPage = getMyProfilePageConfig(location.pathname);

  if (isPending) {
    return <MyProfileInfoCardsSkeleton />;
  }

  if (!profile) {
    const { empty } = MY_PROFILE_MESSAGES;
    return <EmptyState title={empty.title} description={empty.description} />;
  }

  return (
    <>
      <MyProfileRouteTabs />

      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
      >
        <Outlet />
      </ManagementPage>
    </>
  );
};
