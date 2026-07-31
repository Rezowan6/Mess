import { DollarSign } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateExpense } from "../hooks/useCreateExpense";
import { useUpdateExpense } from "../hooks/useUpdateExpense";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";

import { PERMISSIONS } from "@/shared/constants/permissions";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "../schemas/expense.schema";
import type { IExpense } from "../types/expense.types";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  expense?: IExpense;
}

export const AddExpenseModal = ({ isOpen, onClose, expense }: Props) => {
  const { can } = useRBAC();

  const createMutation = useCreateExpense();

  const updateMutation = useUpdateExpense();

  const isEdit = !!expense;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),

    defaultValues: {
      amount: undefined,
      signature: "",
      category: "",
      description: "",
    },
  });

  useEffect(() => {
    if (expense) {
      reset({
        amount: expense.amount,
        signature: expense.signature,
        category: expense.category ?? "",
        description: expense.description ?? "",
      });
    } else {
      reset({
        amount: undefined,
        signature: "",
        category: "",
        description: "",
      });
    }
  }, [expense, reset]);

  if (!can(isEdit ? PERMISSIONS.EXPENSE_UPDATE : PERMISSIONS.EXPENSE_CREATE)) {
    return null;
  }

  const onSubmit = (data: ExpenseFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: expense.id,
          payload: data,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Expense" : "Add Expense"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <Input
          label="Amount"
          type="number"
          leftIcon={<DollarSign size={18} />}
          placeholder="Enter amount"
          error={errors.amount?.message}
          {...register("amount", {
            valueAsNumber: true,
          })}
        />

        <Input
          label="Signature"
          placeholder="Expense signature"
          error={errors.signature?.message}
          {...register("signature")}
        />

        <Input
          label="Category (Optional)"
          placeholder="Food, Rent, Utility..."
          error={errors.category?.message}
          {...register("category")}
        />

        <Input
          label="Description (Optional)"
          placeholder="Expense description"
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="error" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="success"
            type="submit"
            loading={
              isEdit ? updateMutation.isPending : createMutation.isPending
            }
            loadingText={isEdit ? "Updating..." : "Saving..."}
            permission={
              isEdit ? PERMISSIONS.EXPENSE_UPDATE : PERMISSIONS.EXPENSE_CREATE
            }
          >
            {isEdit ? "Update Expense" : "Save Expense"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
