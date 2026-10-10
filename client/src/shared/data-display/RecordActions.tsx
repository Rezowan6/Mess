import { Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/components/ui/Button";
import { TOOLTIP_TEXT } from "@/shared/constants/tooltip.config";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { useConfirmStore } from "@/shared/store/confirm.store";
import type { Permission } from "../constants/permissions";

interface RecordActionsProps {
  updatePermission: Permission;
  locked?: boolean;
  onEdit: () => void;
  onDelete: () => Promise<unknown>;
  deleteTitle: string;
  deleteMessage: ReactNode;
}

export const RecordActions = ({
  updatePermission,
  locked = false,
  onEdit,
  onDelete,
  deleteTitle,
  deleteMessage,
}: RecordActionsProps) => {
  const { can } = useRBAC();
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const tooltip = locked ? TOOLTIP_TEXT.LOCKED_AFTER_24H : undefined;

  const handleDelete = () =>
    openConfirm({
      title: deleteTitle,
      message: deleteMessage,
      onConfirm: async () => {
        try {
          setLoading(true);
          await onDelete();
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="flex items-center gap-2">
      {can(updatePermission) && (
        <>
          <Button
            unstyled
            disabled={locked}
            tooltip={tooltip}
            leftIcon={<Pencil />}
            onClick={onEdit}
          />

          <Button
            unstyled
            disabled={locked}
            tooltip={tooltip}
            leftIcon={<Trash2 />}
            className="text-theme-danger"
            onClick={handleDelete}
          />
        </>
      )}
    </div>
  );
};
