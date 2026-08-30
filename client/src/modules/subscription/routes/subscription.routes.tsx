import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";

import { SubscriptionLayout } from "../layouts/SubscriptionLayout";
import { SubscriptionDetailsPage } from "../pages/SubscriptionDetailsPage";
import { SubscriptionHistoryPage } from "../pages/SubscriptionHistoryPage";
import { SubscriptionPage } from "../pages/SubscriptionPage";
import { UpgradePlanPage } from "../pages/UpgradePlanPage";

export const subscriptionRoutes = {
  path: ROUTES.SUBSCRIPTION,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.SYSTEM_OWNER, ROLES.MESS_MALIK]} />,

  children: [
    {
      element: <SubscriptionLayout />,

      children: [
        {
          index: true,
          element: <SubscriptionPage />,
        },
        {
          path: "upgrade",
          element: <UpgradePlanPage />,
        },
        {
          path: "history",
          element: <SubscriptionHistoryPage />,
        },
        {
          path: ":id",
          element: <SubscriptionDetailsPage />,
        },
      ],
    },
  ],
};
