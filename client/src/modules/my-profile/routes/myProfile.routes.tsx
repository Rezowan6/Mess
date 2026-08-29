import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";

import { MyDepositHistoryPage } from "../pages/MyDepositHistoryPage";
import { MyMealHistoryPage } from "../pages/MyMealHistoryPage";
import { MyProfileOverviewPage } from "../pages/MyProfileOverviewPage";
import { MyProfilePage } from "../pages/MyProfilePage";

export const myProfileRoutes = {
  path: ROUTES.MY_PROFILE,

  element: (
    <RoleGuard
      allowedRoles={[
        ROLES.ADMIN,
        ROLES.MANAGER,
        ROLES.MEMBER,
        ROLES.SYSTEM_OWNER,
        ROLES.MESS_MALIK,
      ]}
    />
  ),

  children: [
    {
      element: <MyProfilePage />,

      children: [
        {
          index: true,
          element: <MyProfileOverviewPage />,
        },
        {
          path: "deposit-history",
          element: <MyDepositHistoryPage />,
        },
        {
          path: "meal-history",
          element: <MyMealHistoryPage />,
        },
      ],
    },
  ],
};
