import type { IPaymentMethod } from "../types/paymentMethod.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";

import { useDeletePaymentMethod } from "../hooks/useDeletePaymentMethod";

interface Props {
  paymentMethod: IPaymentMethod;
  onEdit: (paymentMethod: IPaymentMethod) => void;
}

export const PaymentMethodActions = ({ paymentMethod, onEdit }: Props) => {
  const deleteMutation = useDeletePaymentMethod();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this payment method?"
      details={[
        {
          label: "Provider",
          value: paymentMethod.provider,
          highlight: true,
        },
        {
          label: "Account Name",
          value: paymentMethod.accountName,
        },
        {
          label: "Account Number",
          value: paymentMethod.maskedAccountNumber,
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.PAYMENT_METHOD_UPDATE}
      onEdit={() => onEdit(paymentMethod)}
      onDelete={() => deleteMutation.mutateAsync(Number(paymentMethod.id))}
      deleteTitle="Delete Payment Method"
      deleteMessage={deleteMsg}
    />
  );
};
