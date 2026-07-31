import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { useCreateMealSetting } from "../hooks/useCreateMealSetting";
import { useUpdateMealSetting } from "../hooks/useUpdateMealSetting";

import {
  mealSettingSchema,
  type MealSettingFormValues,
} from "../schemas/mealSetting.schema";

import { mealSettingFields } from "../configs/mealSettingFields";

import { nationalMinutesToTime, timeToMinutes } from "@/shared/utils/time";
import type { IMealSetting } from "../types/mealSetting.types";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  setting?: IMealSetting;
}

export const MealSettingFormModal = ({ isOpen, onClose, setting }: Props) => {
  const { can } = useRBAC();

  const createMutation = useCreateMealSetting();

  const updateMutation = useUpdateMealSetting();

  const isEdit = !!setting;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MealSettingFormValues>({
    resolver: zodResolver(mealSettingSchema),

    defaultValues: {
      breakfastCutoffMinute: setting
        ? nationalMinutesToTime(setting.breakfastCutoffMinute)
        : "04:00",

      lunchCutoffMinute: setting
        ? nationalMinutesToTime(setting.lunchCutoffMinute)
        : "10:00",

      dinnerCutoffMinute: setting
        ? nationalMinutesToTime(setting.dinnerCutoffMinute)
        : "16:00",
    },
  });

  useEffect(() => {
    if (setting) {
      reset({
        breakfastCutoffMinute: nationalMinutesToTime(
          setting.breakfastCutoffMinute,
        ),

        lunchCutoffMinute: nationalMinutesToTime(setting.lunchCutoffMinute),

        dinnerCutoffMinute: nationalMinutesToTime(setting.dinnerCutoffMinute),
      });
    }
  }, [setting, reset]);

  if (
    !can(
      isEdit
        ? PERMISSIONS.MEAL_SETTING_UPDATE
        : PERMISSIONS.MEAL_SETTING_CREATE,
    )
  ) {
    return null;
  }

  const onSubmit = (data: MealSettingFormValues) => {
    const payload = {
      ...data,

      breakfastCutoffMinute: timeToMinutes(data.breakfastCutoffMinute),

      lunchCutoffMinute: timeToMinutes(data.lunchCutoffMinute),

      dinnerCutoffMinute: timeToMinutes(data.dinnerCutoffMinute),
    };

    if (isEdit) {
      updateMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    } else {
      createMutation.mutate(payload, {
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
      title={isEdit ? "Update Meal Setting" : "Create Meal Setting"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {mealSettingFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name]?.message}
            {...register(field.name, {
              ...(field.type === "number" && {
                valueAsNumber: true,
              }),
            })}
          />
        ))}

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
            {isEdit ? "Update Setting" : "Save Setting"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
