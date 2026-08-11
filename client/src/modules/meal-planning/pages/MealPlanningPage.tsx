import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { MealPlanningSummaryCards } from "../components/MealPlanningSummaryCards";
import { MealPlanningTabs } from "../components/MealPlanningTabs";
import { useMealPlanning } from "../hooks/useMealPlanning";

export const MealPlanningPage = () => {
  const { data, isPending, isError, refetch } = useMealPlanning();


  const planning = data?.data;

  return (
    <ManagementPage
      title="Meal Planning"
      description="View and manage daily meal planning for your members."
    >
      <div className="space-y-6">
        <MealPlanningSummaryCards
          summary={planning?.summary}
          loading={isPending}
        />

        <MealPlanningTabs
          planning={planning}
          loading={isPending}
          error={isError}
          refetch={refetch}
        />
      </div>
    </ManagementPage>
  );
};
