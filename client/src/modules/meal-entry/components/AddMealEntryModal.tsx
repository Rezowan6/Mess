import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateMealEntry } from "../hooks/useCreateMealEntry";
import { useUpdateMealEntry } from "../hooks/useUpdateMealEntry";
import { mealEntryFields } from "../configs/mealEntryFields";
import {
  createMealEntrySchema,
  type CreateMealEntryFormValues,
  type UpdateMealEntryFormValues,
} from "../schemas/mealEntry.schema";
import type { IMealEntry } from "../types/mealEntry.types";

import { useRBAC } from "@/shared/hooks/useRBAC";
import { Input } from "@/shared/components/ui/Input";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { formatDateForInput, getLocalDate } from "@/shared/utils/date.utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  meal?: IMealEntry;
}

export const AddMealEntryModal = ({ isOpen, onClose, meal }: Props) => {
  const { can } = useRBAC();
  const createMutation = useCreateMealEntry();
  const updateMutation = useUpdateMealEntry();

  const isEdit = Boolean(meal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMealEntryFormValues>({
    resolver: zodResolver(createMealEntrySchema),
    defaultValues: {
      memberId: undefined,
      mealSessionId: undefined,
      mealRequestId: undefined,
      date: "",
      breakfast: 0,
      lunch: 0,
      dinner: 0,
    },
  });

  useEffect(() => {
    if (meal) {
      reset({
        memberId: meal.userId,
        mealSessionId: meal.mealSessionId,
        mealRequestId: meal.mealRequestId,
        date: meal.date ? formatDateForInput(meal.date)
        : getLocalDate(),
        breakfast: meal.breakfast,
        lunch: meal.lunch,
        dinner: meal.dinner,
      });
    } else {
      reset({
        memberId: undefined,
        mealSessionId: undefined,
        mealRequestId: undefined,
        date: "",
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      });
    }
  }, [meal, reset]);

  if (
    !can(
      isEdit
        ? PERMISSIONS.MEAL_ENTRY_UPDATE
        : PERMISSIONS.MEAL_ENTRY_CREATE,
    )
  ) {
    return null;
  }

  const onSubmit = (data: CreateMealEntryFormValues) => {
    if (isEdit && meal) {
      const payload: UpdateMealEntryFormValues = {
        breakfast: data.breakfast,
        lunch: data.lunch,
        dinner: data.dinner,
      };

      updateMutation.mutate(
        { id: meal.id, payload },
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
      title={isEdit ? "Update Meal Entry" : "Add Meal Entry"}
      isEdit={isEdit}
      isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={
        isEdit
          ? PERMISSIONS.MEAL_ENTRY_UPDATE
          : PERMISSIONS.MEAL_ENTRY_CREATE
      }
    >
      {mealEntryFields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          leftIcon={field.leftIcon}
          error={errors[field.name as keyof CreateMealEntryFormValues]?.message}
          {...register(field.name as keyof CreateMealEntryFormValues, {
            valueAsNumber: field.valueAsNumber,
          })}
        />
      ))}
    </RecordFormModal>
  );
};