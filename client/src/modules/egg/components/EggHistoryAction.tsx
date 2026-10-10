import type { IEgg } from "../types/egg.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { isRecordLocked } from "@/shared/utils/date.utils";
import { useDeleteEgg } from "../hooks/useDeleteEgg";

interface Props {
  egg: IEgg;
  onEdit: (egg: IEgg) => void;
}

export const EggHistoryAction = ({ egg, onEdit }: Props) => {
  const deleteMutation = useDeleteEgg();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this egg record?"
      details={[
        {
          label: "Member",
          value: egg.member.name,
          highlight: true,
        },
        {
          label: "Quantity",
          value: `${egg.quantity} egg(s)`,
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.EXPENSE_UPDATE}
      locked={isRecordLocked(egg.createdAt)}
      onEdit={() => onEdit(egg)}
      onDelete={() =>
        deleteMutation.mutateAsync({
          id: egg.id,
          memberId: egg.memberId,
        })
      }
      deleteTitle="Delete Egg Record"
      deleteMessage={deleteMsg}
    />
  );
};
