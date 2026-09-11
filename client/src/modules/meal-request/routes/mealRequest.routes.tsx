import { MealRequestLayout } from "@/modules/meal-request/layout/MealRequestLayout";
import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { AllPendingMealReqPage } from "../pages/AllPendingMealReqPage";
import { MealRequestSection } from "../pages/MealRequestSection";

export const mealRequestRoutes = {
  path: ROUTES.MEAL_REQUEST,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <MealRequestLayout />,

      children: [
        {
          index: true,
          element: <MealRequestSection />,
        },
        {
          path: "pending-meals",
          element: <AllPendingMealReqPage />,
        },
      ],
    },
  ],
};
