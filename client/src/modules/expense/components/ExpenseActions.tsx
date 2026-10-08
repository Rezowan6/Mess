import { Pencil, Trash2 } from "lucide-react";

import type { IExpense } from "../types/expense.types";

import { Button } from "@/shared/components/ui/Button";

import { useConfirmStore } from "@/shared/store/confirm.store";

import { TOOLTIP_TEXT } from "@/shared/constants/tooltip.config";
import { isRecordLocked } from "@/shared/utils/date.utils";
import { useDeleteExpense } from "../hooks/useDeleteExpense";

interface Props {
  expense: IExpense;
  onEdit: (expense: IExpense) => void;
}

export const ExpenseActions = ({ expense, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const deleteMutation = useDeleteExpense();

  const handleDelete = () =>
    openConfirm({
      title: "Delete Expense",
      message: (
        <>
          Are you sure you want to delete{" "}
          <span className="font-bold text-error">{expense.signature}</span>?
        </>
      ),
      onConfirm: async () => {
        setLoading(true);
        try {
          await deleteMutation.mutateAsync(expense.id);
        } finally {
          setLoading(false);
        }
      },
    });

  const locked = isRecordLocked(expense.createdAt);

  return (
    <div className="flex items-center gap-2">
      <Button
        unstyled
        leftIcon={<Pencil />}
        onClick={() => onEdit(expense)}
        disabled={locked}
        tooltip={locked ? TOOLTIP_TEXT.LOCKED_AFTER_24H : undefined}
      />

      <Button
        unstyled
        leftIcon={<Trash2 />}
        onClick={handleDelete}
        disabled={locked}
        tooltip={locked ? TOOLTIP_TEXT.LOCKED_AFTER_24H : undefined}
        className="text-theme-danger"
      />
    </div>
  );
};
