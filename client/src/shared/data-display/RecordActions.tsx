import { Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/components/ui/Button";
import { TOOLTIP_TEXT } from "@/shared/constants/tooltip.config";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { useConfirmStore } from "@/shared/store/confirm.store";
import type { Permission } from "../constants/permissions";

interface RecordActionsProps {
  updatePermission?: Permission;
  deletePermission?: Permission;
  locked?: boolean;
  tooltipText?: string;
  showEditDelete?: boolean;
  onEdit?: () => void;
  onDelete: () => Promise<unknown>;
  deleteTitle: string;
  deleteMessage: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const RecordActions = ({
  updatePermission,
  deletePermission,
  locked = false,
  tooltipText,
  /** false হলে edit/delete বাটন দেখাবে না (default: true) */
  showEditDelete = true,
  onEdit,
  onDelete,
  deleteTitle,
  deleteMessage,
  /** edit/delete-এর আগে বসবে, যেমন Pay বাটন */
  leading,
  /** edit/delete-এর পরে বসবে, যেমন Details link */
  trailing,
}: RecordActionsProps) => {
  const { can } = useRBAC();
  const canEdit = updatePermission ? can(updatePermission) : false;
  const canDelete = deletePermission
    ? can(deletePermission)
    : updatePermission
      ? can(updatePermission)
      : undefined;

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const tooltip = locked
    ? (tooltipText ?? TOOLTIP_TEXT.LOCKED_AFTER_24H)
    : undefined;
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
    <div className="flex items-center gap-4">
      {leading}
      {showEditDelete && (
        <>
          {canEdit && onEdit && (
            <Button
              unstyled
              disabled={locked}
              tooltip={tooltip}
              leftIcon={<Pencil />}
              onClick={onEdit}
            />
          )}

          {canDelete && (
            <Button
              unstyled
              disabled={locked}
              tooltip={tooltip}
              leftIcon={<Trash2 />}
              className="text-theme-danger"
              onClick={handleDelete}
            />
          )}
        </>
      )}

      {trailing}
    </div>
  );
};
