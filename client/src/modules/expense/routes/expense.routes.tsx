import { PartyExpenseListPage } from "@/modules/party-expense/pages/PartyExpenseListPage";
import { PartyExpensePage } from "@/modules/party-expense/pages/PartyExpensePage";
import { ROUTES } from "@/shared/constants/routes";
import { ExpenseTable } from "../components/ExpenseTable";
import { ExpenseListLayout } from "../layouts/ExpenseListLayout";
import { ExpensePage } from "../pages/ExpensePage";

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
    {
      path: "party",
      element: <PartyExpensePage />,
      children: [
        {
          index: true,
          element: <PartyExpenseListPage />,
        },
      ],
    },
  ],
};
