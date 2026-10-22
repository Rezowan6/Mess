import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { CurrentBillTable } from "../components/CurrentBillTable";
import { CurrentBillHistoryPage } from "../pages/CurrentBillHistoryPage";
import { CurrentBillPage } from "../pages/CurrentBillPage";
import { DeletedCurrentBillsPage } from "../pages/DeletedCurrentBillsPage";

export const currentBillRoutes = {
  path: ROUTES.CURRENT_BILL,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <CurrentBillPage />,

      children: [
        {
          index: true,
          element: <CurrentBillTable />,
        },
        {
          path: "history/:userId",
          element: <CurrentBillHistoryPage />,
        },
        {
          path: "deleted",
          element: <DeletedCurrentBillsPage />,
        },
      ],
    },
  ],
};
