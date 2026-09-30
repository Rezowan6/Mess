

import { ROUTES } from "@/shared/constants/routes";
import { RiceLayout } from "../layout/RiceLayout";
import { RiceManagementPage } from "../pages/RiceManagementPage";
import { RiceHistoryPage } from "../pages/RiceHistoryPage";

export const riceRoutes = {
  path: `${ROUTES.EXPENSE}/rice`,
  element: <RiceLayout />,
  children: [
    {
      index: true,
      element: <RiceManagementPage />,
    },
    {
      path: "history",
      element: <RiceHistoryPage />,
    },
  ],
};
