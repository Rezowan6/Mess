import type { TableColumn } from "@/shared/components/ui/Table";

import type { IExpense } from "../types/expense.types";

import { ExpenseActions } from "../components/ExpenseActions";

import { formatDate } from "@/shared/utils/date.utils";
import { useExpenseTablePermissions } from "./expense.columns.permission";

export const useExpenseColumns = (
  onEdit: (expense: IExpense) => void,
): TableColumn<IExpense>[] => {
  const { canViewDetails } = useExpenseTablePermissions();

  const columns: TableColumn<IExpense>[] = [
    {
      key: "signature",
      title: "Signature",
      render: (expense) => expense.signature,
    },
    {
      key: "amount",
      title: "Amount",
      render: (expense) => expense.amount,
    },
    {
      key: "category",
      title: "Category",
      hideOnMobile: true,
      render: (expense) => expense.category ?? "-",
    },
    {
      key: "expenseDate",
      title: "Date",
      render: (expense) => formatDate(expense.expenseDate),
    },
  ];

  if (canViewDetails) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-24",
      render: (expense) => <ExpenseActions expense={expense} onEdit={onEdit} />,
    });
  }

  return columns;
};
