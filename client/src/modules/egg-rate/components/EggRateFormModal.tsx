import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateEggRate } from "@/modules/egg-rate/hooks/useCreateEggRate";
import { useUpdateEggRate } from "@/modules/egg-rate/hooks/useUpdateEggRate";
import type {
  ICreateEggRateDto,
  IUpdateEggRateDto,
} from "@/modules/egg-rate/types/eggRate.types";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import {
  eggRateSchema,
  type EggRateFormValues,
} from "../schemas/eggRate.schema";

interface EggRateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  eggRate?: {
    id: number;
    rate: number | string;
  };
}

export const EggRateFormModal = ({
  isOpen,
  onClose,
  eggRate,
}: EggRateFormModalProps) => {
  const { can } = useRBAC();

  const createMutation = useCreateEggRate();
  const updateMutation = useUpdateEggRate();

  const isEdit = !!eggRate;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EggRateFormValues>({
    resolver: zodResolver(eggRateSchema),

    defaultValues: {
      rate: undefined,
    },
  });

  useEffect(() => {
    if (eggRate) {
      reset({
        rate: Number(eggRate.rate),
      });
    } else {
      reset({
        rate: undefined,
      });
    }
  }, [eggRate, reset]);

  if (
    !can(
      isEdit
        ? PERMISSIONS.MEAL_SETTING_UPDATE
        : PERMISSIONS.MEAL_SETTING_CREATE,
    )
  ) {
    return null;
  }

  const onSubmit = (data: EggRateFormValues) => {
    if (isEdit) {
      const payload: IUpdateEggRateDto = {
        rate: data.rate,
      };

      updateMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });

      return;
    }

    const payload: ICreateEggRateDto = {
      rate: data.rate,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Egg Rate" : "Set Egg Rate"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <Input
          label="Egg Rate"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Enter egg rate"
          error={errors.rate?.message}
          {...register("rate", {
            valueAsNumber: true,
          })}
        />

        <p className="text-sm text-base-content/60">
          Enter the current price of one egg.
        </p>

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
              isEdit
                ? PERMISSIONS.MEAL_SETTING_UPDATE
                : PERMISSIONS.MEAL_SETTING_CREATE
            }
          >
            {isEdit ? "Update Egg Rate" : "Save Egg Rate"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
