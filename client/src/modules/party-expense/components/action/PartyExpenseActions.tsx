import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { TOOLTIP_TEXT } from "@/shared/constants/tooltip.config";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";
import { useDeletePartyExpense } from "../../hooks/useDeletePartyExpense";
import type { IPartyExpense } from "../../types/partyExpense.types";

interface Props {
  partyExpense: IPartyExpense;
  onEdit: (partyExpense: IPartyExpense) => void;
}

export const PartyExpenseActions = ({ partyExpense, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const deleteMutation = useDeletePartyExpense();

  const locked = isRecordLocked(partyExpense.createdAt);

  return (
    <div className="flex items-center gap-2">
      <Button
        unstyled
        leftIcon={<Pencil />}
        onClick={() => onEdit(partyExpense)}
        disabled={locked}
        tooltip={locked ? TOOLTIP_TEXT.LOCKED_AFTER_24H : undefined}
      />

      <Button
        unstyled
        leftIcon={<Trash2 />}
        disabled={locked}
        tooltip={locked ? TOOLTIP_TEXT.LOCKED_AFTER_24H : undefined}
        className="text-theme-danger"
        onClick={() =>
          openConfirm({
            title: "Delete Party Expense",
            message: (
              <>
                Are you sure you want to delete{" "}
                <span className="font-bold text-error pr-1">
                  {partyExpense.description}
                </span>
                <span className="text-success">
                  date: {formatDate(partyExpense.date)}
                </span>
                ?
              </>
            ),
            onConfirm: async () => {
              try {
                setLoading(true);
                await deleteMutation.mutateAsync(partyExpense.id);
              } finally {
                setLoading(false);
              }
            },
          })
        }
      />
    </div>
  );
};
