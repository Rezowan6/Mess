import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { MyProfileInfoCards } from "../components/MyProfileInfoCards";
import { MyProfileInfoCardsSkeleton } from "../components/MyProfileInfoCardsSkeleton";
import { MY_PROFILE_MESSAGES } from "../configs/myProfile.messages";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyProfileOverviewPage = () => {
  const { data, isPending } = useMyProfile();

  const profile = data?.data;

  if (isPending) {
    return <MyProfileInfoCardsSkeleton />;
  }

  if (!profile) {
    const { empty } = MY_PROFILE_MESSAGES;
    return <EmptyState title={empty.title} description={empty.description} />;
  }

  // not used

  return (
    <ManagementPage
      title="My Profile"
      description="View your meal, deposit and balance information."
    >
      <MyProfileInfoCards summary={profile.summary} />
    </ManagementPage>
  );
};
