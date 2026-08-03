import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { MyProfileInfoCards } from "../components/MyProfileInfoCards";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyProfileOverviewPage = () => {
  const { data, isPending } = useMyProfile();

  const profile = data?.data;

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return (
      <ManagementPage
        title="My Profile"
        description="View your profile information."
      >
        <p>No profile found.</p>
      </ManagementPage>
    );
  }

  return (
    <ManagementPage
      title="My Profile"
      description="View your meal, deposit and balance information."
    >
      <MyProfileInfoCards summary={profile.summary} />
    </ManagementPage>
  );
};
