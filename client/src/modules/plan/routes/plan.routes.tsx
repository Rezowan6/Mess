import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { PlanTable } from "../components/PlanTable";
import { PlanDetailsPage } from "../pages/PlanDetailsPage";
import { PlanManagementPage } from "../pages/PlanManagementPage";

export const planRoutes = {
  path: ROUTES.PLANS,
  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.SYSTEM_OWNER]} />,
  children: [
    {
      element: <PlanManagementPage />,
      children: [
        {
          index: true,
          element: <PlanTable />,
        },
        {
          path: ":id",
          element: <PlanDetailsPage />,
        },
      ],
    },
  ],
};
