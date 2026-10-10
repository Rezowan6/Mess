import type { IExpense } from "../types/expense.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";
import { useDeleteExpense } from "../hooks/useDeleteExpense";

interface Props {
  expense: IExpense;
  onEdit: (expense: IExpense) => void;
}

export const ExpenseActions = ({ expense, onEdit }: Props) => {
  const deleteMutation = useDeleteExpense();
  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this expense?"
      details={[
        {
          label: "Signature",
          value: expense.signature,
          highlight: true,
        },
        {
          label: "Amount",
          value: expense.amount,
        },
        {
          label: "Date",
          value: formatDate(expense.createdAt),
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.EXPENSE_UPDATE}
      locked={isRecordLocked(expense.createdAt)}
      onEdit={() => onEdit(expense)}
      onDelete={() => deleteMutation.mutateAsync(expense.id)}
      deleteTitle="Delete Expense"
      deleteMessage={deleteMsg}
    />
  );
};
