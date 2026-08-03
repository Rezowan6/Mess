import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { MonthlyMealHistoryTable } from "../components/MonthlyMealHistoryTable";
import { useMyProfile } from "../hooks/useMyProfile";
import { BackButton } from "@/shared/components/ui/BackButton";

export const MyMealHistoryPage = () => {
  const { data } = useMyProfile();

  const meals = data?.data?.meals ?? [];

  return (
    <ManagementPage
      title="My Meal History"
      description="View your monthly meal records and daily meal details."
      footer={<BackButton/>}
    >
      <MonthlyMealHistoryTable meals={meals} />
    </ManagementPage>
  );
};
