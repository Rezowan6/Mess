import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { MyProfileInfoCards } from "../components/MyProfileInfoCards";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyProfilePage = () => {
  const { data, isPending } = useMyProfile();

  const profile = data?.data;

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return (
      <ManagementPage
        title="My Profile"
        description="View your meal, deposit and balance information."
      >
        <p>No profile information found.</p>
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
