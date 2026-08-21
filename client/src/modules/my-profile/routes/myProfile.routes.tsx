import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { MyProfileLayout } from "../layout/MyProfileLayout";
import { MyDepositHistoryPage } from "../pages/MyDepositHistoryPage";
import { MyMealHistoryPage } from "../pages/MyMealHistoryPage";
import { MyProfilePage } from "../pages/MyProfilePage";

export const myProfileRoutes = {
  path: ROUTES.MY_PROFILE,

  element: (
    <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]} />
  ),

  children: [
    {
      element: <MyProfileLayout />,

      children: [
        {
          index: true,
          element: <MyProfilePage />,
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
