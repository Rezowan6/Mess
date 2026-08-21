import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { MealEntryPage } from "../pages/MealEntryPage";
import { MealHistoryPage } from "../pages/MealHistoryPage";
import { MembersMealSummaryPage } from "../pages/MembersMealSummaryPage";
import { TodayMealEntriesPage } from "../pages/TodayMealEntriesPage";

export const mealEntryRoutes = {
  path: ROUTES.MEAL_ENTRY,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <MealEntryPage />,

      children: [
        {
          index: true,
          element: <MembersMealSummaryPage />,
        },
        {
          path: "history",
          element: <MealHistoryPage />,
        },
        {
          path: "today-meals",
          element: <TodayMealEntriesPage />,
        },
      ],
    },
  ],
};
