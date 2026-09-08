import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { PageActionMenu } from "@/shared/components/navigation/PageActionMenu";
import { ROUTES } from "@/shared/constants/routes";
import { Calculator, RefreshCw, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MealPlanningSummaryCards } from "../components/MealPlanningSummaryCards";
import { MealPlanningTable } from "../components/MealPlanningTable";
import { useMealPlanning } from "../hooks/useMealPlanning";

export const MealPlanningPage = () => {
  const navigate = useNavigate();
  const { data, isPending, isError, refetch } = useMealPlanning();

  const menuItems = [
    {
      label: "Refresh Planning",
      icon: RefreshCw,
      onClick: () => {
        refetch();
      },
    },
    {
      label: "Meal Settings",
      icon: Settings,
      onClick: () => {
        navigate(`${ROUTES.SETTINGS}/meal-setting`);
      },
    },
    {
      label: "Meal Entry",
      icon: Users,
      onClick: () => {
        navigate(ROUTES.MEAL_ENTRY);
      },
    },
    {
      label: "Monthly Calculation",
      icon: Calculator,
      onClick: () => {
        navigate(ROUTES.MONTHLY_CALCULATION);
      },
    },
  ];
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
