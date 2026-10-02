// File: AddPartyExpenseModal.tsx

import { DollarSign } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";



import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";




import { MemberSelector } from "@/shared/components/ui/MemberSelector";
import type { IPartyExpense } from "../../types/partyExpense.types";
import { useCreatePartyExpense } from "../../hooks/useCreatePartyExpense";
import { useUpdatePartyExpense } from "../../hooks/useUpdatePartyExpense";
import { partyExpenseSchema, type PartyExpenseFormValues } from "../../schemas/partyExpense.schema";

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Party Expense" : "Add Party Expense"}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <Input
            label="Amount"
            type="number"
            leftIcon={<DollarSign size={18} />}
            placeholder="Enter party expense amount"
            error={errors.amount?.message}
            {...register("amount", {
              valueAsNumber: true,
            })}
          />

          <Input
            label="Description"
            type="text"
            placeholder="Enter description"
            error={errors.description?.message}
            {...register("description")}
          />

          <MemberSelector<PartyExpenseFormValues>
            name="memberIds"
            label="Select Members"
            multiple
            showSelectAll
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
            >
              {isEdit ? "Update Party Expense" : "Save Party Expense"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
