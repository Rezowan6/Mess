import { Edit, Trash2 } from "lucide-react";

import type { IExpense } from "../types/expense.types";

import { Button } from "@/shared/components/ui/Button";

import { useConfirmStore } from "@/shared/store/confirm.store";

import { useDeleteExpense } from "../hooks/useDeleteExpense";

interface Props {
  expense: IExpense;
  onEdit: (expense: IExpense) => void;
}

export const ExpenseActions = ({ expense, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const deleteMutation = useDeleteExpense();

  return (
    <div className="flex items-center gap-2">
      <Button unstyled leftIcon={<Edit />} onClick={() => onEdit(expense)} />

      <Button
        unstyled
        leftIcon={<Trash2 />}
        onClick={() =>
          openConfirm({
            title: "Delete Expense",
            message: (
              <>
                Are you sure you want to delete{" "}
                <span className="font-bold text-error">
                  {expense.signature}
                </span>
                ?
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
          })
        }
      />
    </div>
  );
};
