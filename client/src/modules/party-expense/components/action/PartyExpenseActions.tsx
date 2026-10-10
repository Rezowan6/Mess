import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";
import { useDeletePartyExpense } from "../../hooks/useDeletePartyExpense";
import type { IPartyExpense } from "../../types/partyExpense.types";

interface Props {
  partyExpense: IPartyExpense;
  onEdit: (partyExpense: IPartyExpense) => void;
}

export const PartyExpenseActions = ({ partyExpense, onEdit }: Props) => {
  const deleteMutation = useDeletePartyExpense();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this party expense?"
      details={[
        {
          label: "Description",
          value: partyExpense.description,
          highlight: true,
        },
        {
          label: "Amount",
          value: partyExpense.amount,
        },
        {
          label: "Date",
          value: formatDate(partyExpense.date),
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.EXPENSE_CREATE}
      locked={isRecordLocked(partyExpense.createdAt)}
      onEdit={() => onEdit(partyExpense)}
      onDelete={() => deleteMutation.mutateAsync(partyExpense.id)}
      deleteTitle="Delete Party Expense"
      deleteMessage={deleteMsg}
    />
  );
};
