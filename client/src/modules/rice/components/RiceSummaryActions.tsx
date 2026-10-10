import { useDeleteRice } from "../hooks/useDeleteRice";
import { RicePaymentStatus, type IRice } from "../types/rice.types";
import { canAddRicePayment } from "../utils/rice.utils";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";

interface Props {
  rice: IRice;
  onPay: (rice: IRice) => void;
  onEdit: (rice: IRice) => void;
}

export const RiceSummaryActions = ({ rice, onPay, onEdit }: Props) => {
  const deleteMutation = useDeleteRice();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this rice purchase?"
      details={[
        {
          label: "Supplier",
          value: rice.supplierName ?? "N/A",
          highlight: true,
        },
        { label: "Quantity", value: rice.quantity },
        { label: "Amount", value: rice.totalAmount },
        { label: "Date", value: formatDate(rice.createdAt) },
      ]}
    />
  );

  const leading = canAddRicePayment(rice) && (
    <Button
      variant="pay"
      type="button"
      onClick={() => onPay(rice)}
      className="h-8 w-fit"
    >
      Pay
    </Button>
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.EXPENSE_UPDATE}
      showEditDelete={rice.paymentStatus === RicePaymentStatus.DUE}
      locked={isRecordLocked(rice.createdAt)}
      onEdit={() => onEdit(rice)}
      onDelete={() => deleteMutation.mutateAsync(rice.id)}
      deleteTitle="Delete Rice Purchase"
      deleteMessage={deleteMsg}
      leading={leading}
      trailing={
        <ActionLink to={`${ROUTES.EXPENSE}/rice/${rice.id}`}>
          Details
        </ActionLink>
      }
    />
  );
};
