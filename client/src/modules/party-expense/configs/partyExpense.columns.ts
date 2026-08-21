// File: partyExpense.columns.ts

import type { TableColumn } from "@/shared/components/ui/Table";
import type { IPartyExpense } from "../types/partyExpense.types";
import { formatDate } from "@/shared/utils/date.utils";

export const usePartyExpenseColumns = (): TableColumn<IPartyExpense>[] => {
  const columns: TableColumn<IPartyExpense>[] = [
    {
      key: "date",
      title: "Date",
      render: (expense) => formatDate(expense.date),
    },
    {
      key: "amount",
      title: "Total Amount",
      render: (expense) => expense.amount,
    },
    {
      key: "description",
      title: "Description",
      render: (expense) => expense.description ?? "-",
    },
    {
      key: "members",
      title: "Members",
      render: (expense) => expense.members?.length ?? 0,
    },
  ];

  return columns;
};
