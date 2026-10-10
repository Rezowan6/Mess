import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateExpense } from "../hooks/useCreateExpense";
import { useUpdateExpense } from "../hooks/useUpdateExpense";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { Input } from "@/shared/components/ui/Input";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "../schemas/expense.schema";
import type { IExpense } from "../types/expense.types";
import { expenseFields } from "../configs/expense.fields.config";

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
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Expense" : "Add Expense"}
      isEdit={isEdit}
      isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={
        isEdit ? PERMISSIONS.EXPENSE_UPDATE : PERMISSIONS.EXPENSE_CREATE
      }
    >
      {expenseFields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          leftIcon={field.leftIcon}
          error={errors[field.name]?.message}
          {...register(field.name, {
            valueAsNumber: field.valueAsNumber,
          })}
        />
      ))}
    </RecordFormModal>
  );
};
