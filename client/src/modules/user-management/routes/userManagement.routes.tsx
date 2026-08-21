import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { UserManagementPage } from "../pages/UserManagementPage";

export const userManagementRoutes = {
  path: ROUTES.USERS,

  element: <PermissionGuard permission={PERMISSIONS.USER_VIEW} />,

  children: [
    {
      index: true,
      element: <UserManagementPage />,
    },
  ],
};
