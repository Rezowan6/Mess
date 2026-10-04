import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { PageActionMenu } from "@/shared/components/navigation/PageActionMenu";
import { MealPlanningSummaryCards } from "../components/MealPlanningSummaryCards";
import { MealPlanningTable } from "../components/MealPlanningTable";
import { pageActionMenu } from "../configs/pageActionMenu";
import { useMealPlanning } from "../hooks/useMealPlanning";

export const MealPlanningPage = () => {
  const { data, isPending, isError, refetch, isFetching } = useMealPlanning();
  const menuItems = pageActionMenu(refetch, isFetching);

  const planning = data?.data;

  return (
    <ManagementPage
      title="Meal Planning"
      description="View and manage today meal planning for your members."
      action={<PageActionMenu items={menuItems} placement="bottom-end" />}
    >
      <div className="space-y-6">
        <MealPlanningSummaryCards
          summary={planning?.summary}
          loading={isPending}
        />

        <MealPlanningTable
          planning={planning}
          loading={isPending}
          error={isError}
          refetch={refetch}
        />
      </div>
    </ManagementPage>
  );
};
