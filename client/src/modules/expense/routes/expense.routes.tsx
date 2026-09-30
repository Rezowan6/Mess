import { eggRoutes } from "@/modules/egg/routes/egg.routes";
import { partyExpenseRoutes } from "@/modules/party-expense/routes/partyExpense.routes";
import { ExpenseTable } from "../components/ExpenseTable";
import { ExpenseListLayout } from "../layouts/ExpenseListLayout";
import { ExpensePage } from "../pages/ExpensePage";

import { ROUTES } from "@/shared/constants/routes";
import { riceRoutes } from "@/modules/rice/routes/rice.routes";

export const expenseRoutes = {
  path: ROUTES.EXPENSE,
  element: <ExpensePage />,
  children: [
    {
      element: <ExpenseListLayout />,
      children: [
        {
          index: true,
          element: <ExpenseTable />,
        },
      ],
    },

    partyExpenseRoutes,
    eggRoutes,
    riceRoutes,
  ],
};
