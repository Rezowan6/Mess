import { EggLayout } from "@/modules/egg/layouts/EggLayout";

import { ROUTES } from "@/shared/constants/routes";
import { EggHistoryPage } from "../pages/EggHistoryPage";
import { EggManagementPage } from "../pages/EggManagementPage";

export const eggRoutes = {
  path: `${ROUTES.EXPENSE}/egg`,
  element: <EggLayout />,
  children: [
    {
      index: true,
      element: <EggManagementPage />,
    },
    {
      path: "history/:memberId",
      element: <EggHistoryPage />,
    },
  ],
};
