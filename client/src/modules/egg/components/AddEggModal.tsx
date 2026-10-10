import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Counter } from "@/shared/components/ui/Counter";

import { useCreateEgg } from "../hooks/useCreateEgg";
import { useUpdateEgg } from "../hooks/useUpdateEgg";

import { eggSchema, type EggFormValues } from "../schemas/egg.schema";

import type { IEgg } from "../types/egg.types";

import { MemberSelector } from "@/shared/components/ui/MemberSelector";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  egg?: IEgg;
}

export const AddEggModal = ({ isOpen, onClose, egg }: Props) => {
  const createMutation = useCreateEgg();
  const updateMutation = useUpdateEgg();

  const isEdit = !!egg;

  const methods = useForm<EggFormValues>({
    resolver: zodResolver(eggSchema),
    defaultValues: {
      memberId: undefined,
      quantity: 1,
    },
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  const quantity = watch("quantity");

  useEffect(() => {
    if (egg) {
      reset({
        memberId: egg.memberId,
        quantity: Number(egg.quantity),
      });
    } else {
      reset({
        memberId: undefined,
        quantity: 1,
      });
    }
  }, [egg, reset]);

  const onSubmit = (data: EggFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: egg?.id,
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
        title={isEdit ? "Update Egg" : "Add Egg"}
        isEdit={isEdit}
        isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
        onSubmit={handleSubmit(onSubmit)}
        permission={
          isEdit ? PERMISSIONS.EXPENSE_UPDATE : PERMISSIONS.EXPENSE_CREATE
        }
      >
        <MemberSelector<EggFormValues> name="memberId" label="Select Member" />

        <div className="flex items-center justify-between rounded-theme-md border border-theme-border px-4 py-4">
          <div>
            <p className="text-sm font-medium">Egg Quantity</p>
            <p className="mt-1 text-xs text-theme-text-muted">
              Select how many eggs this member consumed.
            </p>
          </div>

          <Counter
            value={quantity}
            min={1}
            onChange={(value) =>
              setValue("quantity", value, { shouldValidate: true })
            }
          />
        </div>
      </RecordFormModal>
    </FormProvider>
  );
};
