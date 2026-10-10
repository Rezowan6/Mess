import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateEggRate } from "@/modules/egg-rate/hooks/useCreateEggRate";
import { useUpdateEggRate } from "@/modules/egg-rate/hooks/useUpdateEggRate";
import type {
  ICreateEggRateDto,
  IUpdateEggRateDto,
} from "@/modules/egg-rate/types/eggRate.types";

import { Input } from "@/shared/components/ui/Input";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
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
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Egg Rate" : "Set Egg Rate"}
      isEdit={isEdit}
      isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={
        isEdit
          ? PERMISSIONS.MEAL_SETTING_UPDATE
          : PERMISSIONS.MEAL_SETTING_CREATE
      }
    >
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

      <p className="text-sm text-theme-text-muted">
        Enter the current price of one egg.
      </p>
    </RecordFormModal>
  );
};
