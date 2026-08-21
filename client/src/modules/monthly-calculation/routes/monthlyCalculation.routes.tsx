import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { MonthlyCalculationPage } from "../pages/MonthlyCalculationPage";

export const monthlyCalculationRoutes = {
  path: ROUTES.MONTHLY_CALCULATION,

  element: <RoleGuard allowedRoles={[ROLES.MANAGER]} />,

  children: [
    {
      index: true,
      element: <MonthlyCalculationPage />,
    },
  ],
};
