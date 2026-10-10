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
  showEditDelete?: boolean;
  onEdit: () => void;
  onDelete: () => Promise<unknown>;
  deleteTitle: string;
  deleteMessage: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const RecordActions = ({
  updatePermission,
  locked = false,
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
      {leading}
      {showEditDelete  && can(updatePermission) && (
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

      {trailing}
    </div>
  );
};
