import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { PageActionMenu } from "@/shared/components/navigation/PageActionMenu";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { Calendar, Calendar1, Settings } from "lucide-react";
import { getMealEntryPageConfig } from "../configs/mealEntry.page.config";

export const MealEntryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { can } = useRBAC();

  const currentPage = getMealEntryPageConfig({
    pathname: location.pathname,
  });
  const menuItems = [
    {
      label: "Today Meals ",
      icon: Calendar1,
      onClick: () => {
        navigate(`${ROUTES.MEAL_ENTRY}/today-meals`);
      },
    },
    {
      label: "Pending Meals ",
      icon: Calendar,
      onClick: () => {
        navigate(`${ROUTES.MEAL_REQUEST}/pending-meals`);
      },
    },

    {
      label: "Meal Settings",
      icon: Settings,
      onClick: () => {
        navigate(`${ROUTES.SETTINGS}/meal-setting`);
      },
    },
  ];

  return (
    <ManagementPage
      title={currentPage.title}
      description={currentPage.description}
      action={
        can(PERMISSIONS.MEAL_ENTRY_CREATE) && (
          <PageActionMenu items={menuItems} placement="bottom-end" />
        )
      }
    >
      <Outlet />
    </ManagementPage>
  );
};
