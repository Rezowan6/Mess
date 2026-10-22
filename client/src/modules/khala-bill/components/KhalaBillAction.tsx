import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatMonthName, isRecordLocked } from "@/shared/utils/date.utils";

import { useDeleteKhalaBill } from "../hooks/useDeleteKhalaBill";
import type { IKhalaBill } from "../types/khalaBill.types";

interface Props {
  khalaBill: IKhalaBill;
  onEdit: (khalaBill: IKhalaBill) => void;
}

export const KhalaBillAction = ({ khalaBill, onEdit }: Props) => {
  const deleteMutation = useDeleteKhalaBill();

  const deleteMessage = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this Khala bill?"
      details={[
        {
          label: "Member",
          value: khalaBill.member?.name ?? `Member #${khalaBill.userId}`,
          highlight: true,
        },
        { label: "Amount", value: khalaBill.amount },
        {
          label: "Month",
          value: `${formatMonthName(khalaBill.month)}/${khalaBill.year}`,
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.KHALA_BILL_UPDATE}
      locked={isRecordLocked(khalaBill.createdAt)}
      onEdit={() => onEdit(khalaBill)}
      onDelete={() => deleteMutation.mutateAsync(khalaBill.id)}
      deleteTitle="Delete Khala Bill"
      deleteMessage={deleteMessage}
    />
  );
};
