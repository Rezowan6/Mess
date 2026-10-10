import type { IDeposit } from "../types/deposit.types";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";
import { useDeleteDeposit } from "../hooks/useDeleteDeposit";

interface Props {
  deposit: IDeposit;

  onEdit: (deposit: IDeposit) => void;
}

export const DepositActions = ({ deposit, onEdit }: Props) => {
  const deleteMutation = useDeleteDeposit();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this deposit?"
      details={[
        {
          label: "Member",
          value: deposit.member.name,
          highlight: true,
        },
        {
          label: "Amount",
          value: deposit.amount,
        },
        {
          label: "Date",
          value: formatDate(deposit.createdAt),
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.DEPOSIT_UPDATE}
      locked={isRecordLocked(deposit.createdAt)}
      onEdit={() => onEdit(deposit)}
      onDelete={() => deleteMutation.mutateAsync(deposit.id)}
      deleteTitle="Delete Deposit"
      deleteMessage={deleteMsg}
    />
  );
};
