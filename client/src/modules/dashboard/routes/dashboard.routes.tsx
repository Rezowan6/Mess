import { DashboardPage } from "@/pages/DashboardPage";
import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";

export const dasboardRoutes = {
  path: ROUTES.DASHBOARD,
  element: (
    <RoleGuard allowedRoles={[ROLES.MANAGER, ROLES.ADMIN, ROLES.MEMBER]} />
  ),

  children: [
    {
      index: true,
      element: <DashboardPage />,
    },
  ],
};
