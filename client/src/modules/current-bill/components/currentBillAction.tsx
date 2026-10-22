import { PERMISSIONS } from "@/shared/constants/permissions";

import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatMonthName, isRecordLocked } from "@/shared/utils/date.utils";
import { useDeleteCurrentBill } from "../hooks/useDeleteCurrentBill";
import type { ICurrentBill } from "../types/currentBill.types";

interface Props {
  currentBill: ICurrentBill;
  onEdit: (currentBill: ICurrentBill) => void;
}

export const CurrentBillAction = ({ currentBill, onEdit }: Props) => {
  const deleteMutation = useDeleteCurrentBill();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this current bill?"
      details={[
        {
          label: "Member",
          value: currentBill.member?.name ?? `Member #${currentBill.userId}`,
          highlight: true,
        },
        {
          label: "Amount",
          value: currentBill.amount,
        },
        {
          label: "Month",
          value: `${formatMonthName(currentBill.month)}/${currentBill.year}`,
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.CURRENT_BILL_UPDATE}
      locked={isRecordLocked(currentBill.createdAt)}
      onEdit={() => onEdit(currentBill)}
      onDelete={() => deleteMutation.mutateAsync(currentBill.id)}
      deleteTitle="Delete Current Bill"
      deleteMessage={deleteMsg}
    />
  );
};
