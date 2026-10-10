import { useDeleteRicePayment } from "@/modules/rice-payment/hooks/useDeleteRicePayment";
import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";

interface Props {
  riceId: number;
  payment: IRicePayment;
  onEdit: (payment: IRicePayment) => void;
}

export const RicePaymentHistoryAction = ({
  riceId,
  payment,
  onEdit,
}: Props) => {
  const deleteMutation = useDeleteRicePayment(riceId);

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this rice payment?"
      details={[
        { label: "Amount", value: payment.amount, highlight: true },
        { label: "Date", value: formatDate(payment.paymentDate) },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.EXPENSE_CREATE}
      locked={isRecordLocked(payment.createdAt)}
      onEdit={() => onEdit(payment)}
      onDelete={() =>
        deleteMutation.mutateAsync({
          riceId,
          id: payment.id,
        })
      }
      deleteTitle="Delete Rice Payment"
      deleteMessage={deleteMsg}
    />
  );
};
