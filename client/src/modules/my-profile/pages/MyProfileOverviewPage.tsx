import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { MonthlyMealSummaryCard } from "../components/MonthlyMealSummaryCard";
import { MyProfileFinancialSummary } from "../components/MyProfileFinancialSummary";
import { MyProfileInfoCardsSkeleton } from "../components/MyProfileInfoCardsSkeleton";
import { MyProfileMealBreakdown } from "../components/MyProfileMealBreakdown";
import { MyProfileRecentDeposits } from "../components/MyProfileRecentDeposits";
import { MY_PROFILE_MESSAGES } from "../configs/myProfile.messages";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyProfileOverviewPage = () => {
  const { data, isPending, isError, refetch } = useMyProfile();

  const profile = data?.data;

  if (isPending) {
    return <MyProfileInfoCardsSkeleton />;
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
