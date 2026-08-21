import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
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
          element: <DepositAddPage />,
        },
        {
          path: "history",
          element: <DepositHistoryPage />,
        },
      ],
    },
  ],
};
