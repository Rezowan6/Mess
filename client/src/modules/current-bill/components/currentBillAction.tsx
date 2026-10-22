import type { IDeposit } from "../types/deposit.types";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";
import { useDeleteCurrentBill } from "../hooks/useDeleteCurrentBill";
import type { ICurrentBill } from "../types/currentBill.types";

interface Props {
  currentBill: ICurrentBill;

  onEdit: (deposit: IDeposit) => void;
}

export const CurrentBillAction = ({ currentBill, onEdit }: Props) => {
  const deleteMutation = useDeleteCurrentBill();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this deposit?"
      details={[
        {
          label: "Member",
          value: currentBill.member.name,
          highlight: true,
        },
        {
          label: "Amount",
          value: currentBill.amount,
        },
        {
          label: "Date",
          value: formatDate(currentBill.createdAt),
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.DEPOSIT_UPDATE}
      locked={isRecordLocked(currentBill.createdAt)}
      onEdit={() => onEdit(currentBill)}
      onDelete={() => deleteMutation.mutateAsync(currentBill.id)}
      deleteTitle="Delete Deposit"
      deleteMessage={deleteMsg}
    />
  );
};
