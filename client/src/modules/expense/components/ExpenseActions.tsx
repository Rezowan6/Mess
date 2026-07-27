import { Edit, Trash2 } from "lucide-react";

import type { IExpense } from "../types/expense.types";

import { Button } from "@/shared/components/ui/Button";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { useConfirmStore } from "@/shared/store/confirm.store";

import { useDeleteExpense } from "../hooks/useDeleteExpense";

interface Props {
  expense: IExpense;
  onEdit: (expense: IExpense) => void;
}

export const ExpenseActions = ({ expense, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const { can } = useRBAC();

  const deleteMutation = useDeleteExpense();

  return (
    <div className="flex items-center gap-2">
      {can(PERMISSIONS.EXPENSE_UPDATE) && (
        <Button
          variant="success"
          size="sm"
          leftIcon={<Edit size={14} />}
          className="px-2 sm:px-3 h-8"
          onClick={() => onEdit(expense)}
        >
          <span className="hidden sm:inline">Edit</span>
        </Button>
      )}

      {can(PERMISSIONS.EXPENSE_DELETE) && (
        <Button
          variant="error"
          size="sm"
          leftIcon={<Trash2 size={14} />}
          className="px-2 sm:px-3 h-8"
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
                await deleteMutation.mutateAsync(expense.id);
              },
            })
          }
        >
          <span className="hidden sm:inline">Delete</span>
        </Button>
      )}
    </div>
  );
};
