// File: partyExpense.columns.ts

import { ActionLink } from "@/shared/components/ui/ActionLink";
import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatDate } from "@/shared/utils/date.utils";
import type { IPartyExpense } from "../types/partyExpense.types";
import { PartyExpenseActions } from "../components/action/PartyExpenseActions";

export const usePartyExpenseColumns = (
  onEdit: (expense: IPartyExpense) => void,
): TableColumn<IPartyExpense>[] => {
  const { can } = useRBAC();
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

  if (can(PERMISSIONS.EXPENSE_UPDATE) || can(PERMISSIONS.EXPENSE_DELETE)) {
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
