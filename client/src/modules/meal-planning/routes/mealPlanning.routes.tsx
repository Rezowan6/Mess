import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";

import { MealPlanningLayout } from "../layouts/MealPlanningLayout";
import { MealPlanningPage } from "../pages/MealPlanningPage";

export const mealPlanningRoutes = {
  path: ROUTES.MEAL_PLANNING,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <MealPlanningLayout />,

      children: [
        {
          index: true,
          element: <MealPlanningPage />,
        },
      ],
    },
  ],
};
