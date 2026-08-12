import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { formatDate, getCurrentlDate } from "@/shared/utils/date.utils";
import { MealPlanningSummaryCards } from "../components/MealPlanningSummaryCards";
import { MealPlanningTable } from "../components/MealPlanningTable";
import { useMealPlanning } from "../hooks/useMealPlanning";

export const MealPlanningPage = () => {
  const { data, isPending, isError, refetch } = useMealPlanning();

  const planning = data?.data;

  const today = formatDate(getCurrentlDate());

  return (
    <ManagementPage
      title="Meal Planning"
      description="View and manage today meal planning for your members."
      footer={<p className="text-xs text-info">{today}</p>}
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
