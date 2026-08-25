// partyExpense.routes.tsx

import { PartyExpenseLayout } from "@/modules/party-expense/layouts/PartyExpenseLayout";
import { PartyExpenseHistoryPage } from "@/modules/party-expense/pages/PartyExpenseHistoryPages";
import { PartyExpenseListPage } from "@/modules/party-expense/pages/PartyExpenseListPage";

import { ROUTES } from "@/shared/constants/routes";

export const partyExpenseRoutes = {
  path: `${ROUTES.EXPENSE}/party`,
  element: <PartyExpenseLayout />,
  children: [
    {
      index: true,
      element: <PartyExpenseListPage />,
    },
    {
      path: "history",
      element: <PartyExpenseHistoryPage />,
    },
  ],
};
