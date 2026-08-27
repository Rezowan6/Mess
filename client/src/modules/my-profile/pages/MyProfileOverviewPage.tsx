import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { MonthlyMealSummaryCard } from "../components/MonthlyMealSummaryCard";
import { MyProfileFinancialSummary } from "../components/MyProfileFinancialSummary";
import { MyProfileInfoCardsSkeleton } from "../components/MyProfileInfoCardsSkeleton";
import { MyProfileMealBreakdown } from "../components/MyProfileMealBreakdown";
import { MyProfileRecentDeposits } from "../components/MyProfileRecentDeposits";
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
    <div className="space-y-6">
      <MyProfileFinancialSummary summary={profile.summary} />

      <MonthlyMealSummaryCard summary={profile.mealSummary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <MyProfileMealBreakdown summary={profile.mealSummary} />

        <MyProfileRecentDeposits deposits={profile.deposits} />
      </div>
    </div>
  );
};
