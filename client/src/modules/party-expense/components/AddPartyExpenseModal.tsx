// File: AddPartyExpenseModal.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreatePartyExpense } from "../hooks/useCreatePartyExpense";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";

import {
  partyExpenseSchema,
  type PartyExpenseFormValues,
} from "../schemas/partyExpense.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPartyExpenseModal = ({ isOpen, onClose }: Props) => {
  const createMutation = useCreatePartyExpense();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartyExpenseFormValues>({
    resolver: zodResolver(partyExpenseSchema),
    defaultValues: {
      amount: undefined,
      description: "",
      memberIds: [],
    },
  });

  const onSubmit = (data: PartyExpenseFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Party Expense">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <Input
          label="Amount"
          type="number"
          placeholder="Enter party expense amount"
          error={errors.amount?.message}
          {...register("amount", { valueAsNumber: true })}
        />

        <Input
          label="Description"
          type="text"
          placeholder="Enter description"
          error={errors.description?.message}
          {...register("description")}
        />

        {/* Member selection will be added here */}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="error" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="success"
            type="submit"
            loading={createMutation.isPending}
            loadingText="Saving..."
          >
            Save Party Expense
          </Button>
        </div>
      </form>
    </Modal>
  );
};
