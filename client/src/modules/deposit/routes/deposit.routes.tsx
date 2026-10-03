import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { RoleGuard } from "@/shared/guards/role.guard";
import { DepositTable } from "../components/DepositTable";
import { DepositAddPage } from "../pages/DepositAddPage";
import { DepositHistoryPage } from "../pages/DepositHistoryPage";
import { DepositPage } from "../pages/DepositPage";

export const depositRoutes = {
  path: ROUTES.DEPOSIT,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <DepositPage />,

      children: [
        {
          index: true,
          element: <DepositTable />,
        },
        {
          path: "quick-add",
          element: (
            <PermissionGuard permission={PERMISSIONS.DEPOSIT_CREATE}>
              <DepositAddPage />
            </PermissionGuard>
          ),
        },
        {
          path: "history/:memberId",
          element: <DepositHistoryPage />,
        },
      ],
    },
  ],
};
