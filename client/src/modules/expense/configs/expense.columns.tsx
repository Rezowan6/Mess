import type { TableColumn } from "@/shared/components/ui/Table";

import type { IExpense } from "../types/expense.types";

import { ExpenseActions } from "../components/ExpenseActions";

import { Badge } from "@/shared/components/ui/Badge";
import { formatDate } from "@/shared/utils/date.utils";
import { formatTaka } from "@/shared/utils/format.utils";
import { useExpenseTablePermissions } from "./expense.columns.permission";

export const useExpenseColumns = (
  onEdit: (expense: IExpense) => void,
): TableColumn<IExpense>[] => {
  const { canViewDetails } = useExpenseTablePermissions();

  const columns: TableColumn<IExpense>[] = [
    {
      key: "signature",
      title: "Signature",
      render: (expense) => (
        <>
          <Badge size="sm" variant="soft-success">
            {expense.signature}
          </Badge>
        </>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (expense) => formatTaka(expense.amount),
    },
    {
      key: "category",
      title: "Category",
      render: (expense) => (
        <>
          <Badge size="sm" variant="soft-info">
            {expense.category || "-"}
          </Badge>
        </>
      ),
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
