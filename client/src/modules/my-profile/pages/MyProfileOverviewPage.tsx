import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { MonthlyMealSummaryCard } from "../components/MonthlyMealSummaryCard";
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

  return (
    <>
      <MonthlyMealSummaryCard summary={profile.mealSummary} />
      <MyProfileInfoCards summary={profile.summary} />
    </>
  );
};
