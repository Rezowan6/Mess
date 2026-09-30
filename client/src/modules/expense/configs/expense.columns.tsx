import type { TableColumn } from "@/shared/components/ui/Table";

import type { IExpense } from "../types/expense.types";

import { ExpenseActions } from "../components/ExpenseActions";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatDate } from "@/shared/utils/date.utils";

export const useExpenseColumns = (
  onEdit: (expense: IExpense) => void,
): TableColumn<IExpense>[] => {
  const { can } = useRBAC();

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

  if (can(PERMISSIONS.EXPENSE_UPDATE) || can(PERMISSIONS.EXPENSE_DELETE)) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-24",
      render: (expense) => <ExpenseActions expense={expense} onEdit={onEdit} />,
    });
  }

  return columns;
};
