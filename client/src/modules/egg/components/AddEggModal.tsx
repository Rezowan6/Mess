import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/Button";
import { Counter } from "@/shared/components/ui/Counter";
import { Modal } from "@/shared/components/ui/Modal";

import { useCreateEgg } from "../hooks/useCreateEgg";
import { useUpdateEgg } from "../hooks/useUpdateEgg";

import { eggSchema, type EggFormValues } from "../schemas/egg.schema";

import type { IEgg } from "../types/egg.types";

import { MemberSelector } from "@/shared/components/ui/MemberSelector";

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Egg" : "Add Egg"}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <MemberSelector<EggFormValues>
            name="memberId"
            label="Select Member"
          />

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
                setValue("quantity", value, {
                  shouldValidate: true,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              {isEdit ? "Update Egg" : "Add Egg"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
