import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";

import { KhalaBillTable } from "../components/KhalaBillTable";
import { KhalaBillHistoryPage } from "../pages/KhalaBillHistoryPage";
import { KhalaBillPage } from "../pages/KhalaBillPage";

export const khalaBillRoutes = {
  path: ROUTES.KHALA_BILL,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <KhalaBillPage />,
      children: [
        {
          index: true,
          element: <KhalaBillTable />,
        },
        {
          path: "history/:userId",
          element: <KhalaBillHistoryPage />,
        },
      ],
    },
  ],
};
