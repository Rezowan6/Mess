import { ROUTES } from "@/shared/constants/routes";

import { SettlementPage } from "../pages/SettlementPage";
import { SettlementListPage } from "../pages/SettlementListPage";

export const settlementRoutes = {
  path: ROUTES.SETTLEMENT,
  element: <SettlementPage />,
  children: [
    {
      index: true,
      element: <SettlementListPage />,
    },
  ],
};