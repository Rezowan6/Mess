// File: partyExpense.columns.ts

import { ActionLink } from "@/shared/components/ui/ActionLink";
import type { TableColumn } from "@/shared/components/ui/Table";
import { ROUTES } from "@/shared/constants/routes";
import { formatDate } from "@/shared/utils/date.utils";
import { PartyExpenseActions } from "../components/action/PartyExpenseActions";
import type { IPartyExpense } from "../types/partyExpense.types";
import { usePartyExpenseTablePermissions } from "./partyExpense.columns.permission";

export const usePartyExpenseColumns = (
  onEdit: (expense: IPartyExpense) => void,
): TableColumn<IPartyExpense>[] => {
  const { canViewActions } = usePartyExpenseTablePermissions();
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
      render: (expense) => (
        <ActionLink state={expense} to={`${ROUTES.EXPENSE}/party/history`}>
          {expense.members?.length ?? 0} Details
        </ActionLink>
      ),
    },
  ];

  if (canViewActions) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-24",
      render: (expense) => (
        <PartyExpenseActions partyExpense={expense} onEdit={onEdit} />
      ),
    });
  }

  return columns;
};
