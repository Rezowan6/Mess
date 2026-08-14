import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ActionLink } from "@/shared/components/ui/ActionLink";
import { ROUTES } from "@/shared/constants/routes";
import { MonthlyMealSummaryCard } from "../components/MonthlyMealSummaryCard";
import { MyProfileInfoCards } from "../components/MyProfileInfoCards";
import { MyProfileInfoCardsSkeleton } from "../components/MyProfileInfoCardsSkeleton";
import { MY_PROFILE_MESSAGES } from "../configs/myProfile.messages";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyProfilePage = () => {
  const { data, isPending } = useMyProfile();

  const profile = data?.data;

  if (isPending) {
    return <MyProfileInfoCardsSkeleton />;
  }

  if (!profile) {
    const { empty } = MY_PROFILE_MESSAGES;
    return <EmptyState title={empty.title} description={empty.description} />;
  }

  return (
    <ManagementPage
      title="My Profile"
      description="View your meal, deposit and balance information."
      footer={
        <ActionLink to={`${ROUTES.MY_PROFILE}/meal-history`}>
          My meal details
        </ActionLink>
      }
    >
      <MonthlyMealSummaryCard summary={profile.mealSummary} />

      <ActionLink to={`${ROUTES.MY_PROFILE}/deposit-history`}>
        My deposit details
      </ActionLink>

      <MyProfileInfoCards summary={profile.summary} />
    </ManagementPage>
  );
};
