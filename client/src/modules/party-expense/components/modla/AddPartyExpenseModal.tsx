// File: AddPartyExpenseModal.tsx

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/components/ui/Input";

import { MemberSelector } from "@/shared/components/ui/MemberSelector";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { partyExpenseFields } from "../../configs/partyExpense.fields.config";
import { useCreatePartyExpense } from "../../hooks/useCreatePartyExpense";
import { useUpdatePartyExpense } from "../../hooks/useUpdatePartyExpense";
import {
  partyExpenseSchema,
  type PartyExpenseFormValues,
} from "../../schemas/partyExpense.schema";
import type { IPartyExpense } from "../../types/partyExpense.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  partyExpense?: IPartyExpense;
}

export const AddPartyExpenseModal = ({
  isOpen,
  onClose,
  partyExpense,
}: Props) => {
  const createMutation = useCreatePartyExpense();
  const updateMutation = useUpdatePartyExpense();

  const isEdit = !!partyExpense;

  const methods = useForm<PartyExpenseFormValues>({
    resolver: zodResolver(partyExpenseSchema),

    defaultValues: {
      amount: undefined,
      description: "",
      memberIds: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (partyExpense) {
      reset({
        amount: partyExpense.amount,
        description: partyExpense.description ?? "",
        memberIds: partyExpense.members?.map((item) => item.memberId) ?? [],
      });
    } else {
      reset({
        amount: undefined,
        description: "",
        memberIds: [],
      });
    }
  }, [partyExpense, reset]);

  const onSubmit = (data: PartyExpenseFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: partyExpense.id,
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
    <FormProvider {...methods}>
      <RecordFormModal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Update Party Expense" : "Add Party Expense"}
        isEdit={isEdit}
        isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
        onSubmit={handleSubmit(onSubmit)}
        permission={
          isEdit ? PERMISSIONS.EXPENSE_CREATE : PERMISSIONS.EXPENSE_CREATE
        }
      >
        {partyExpenseFields.map((field) => (
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

        <MemberSelector<PartyExpenseFormValues>
          name="memberIds"
          label="Select Members"
          multiple
          showSelectAll
        />
      </RecordFormModal>
    </FormProvider>
  );
};
