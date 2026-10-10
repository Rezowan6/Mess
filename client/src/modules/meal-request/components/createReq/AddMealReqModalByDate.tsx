import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

import { MealCounterField } from "@/modules/meal-request/components/createReq/MealCounterField";
import { mealFields } from "@/modules/meal-request/configs/mealFields";
import { useCreateMealRequestByDate } from "@/modules/meal-request/hooks/useCreateMealRequestByDate";
import { mealRequestSchemaByDate } from "@/modules/meal-request/schemas/mealRequest.schema";
import type { ICreateMealRequestByDatePayload } from "@/modules/meal-request/types/mealRequest.types";
import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";

import { Input } from "@/shared/components/ui/Input";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";

type MealRequestFormInput = z.input<typeof mealRequestSchemaByDate>;
type MealRequestFormOutput = z.output<typeof mealRequestSchemaByDate>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMealReqModalByDate = ({ isOpen, onClose }: Props) => {
  const { can } = useRBAC();
  const { data: mealSettingData } = useMealSetting();
  const mealSetting = mealSettingData?.data;

  const createMutation = useCreateMealRequestByDate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MealRequestFormInput, unknown, MealRequestFormOutput>({
    resolver: zodResolver(mealRequestSchemaByDate),
    defaultValues: {
      date: "",
      breakfast: 0,
      lunch: 0,
      dinner: 0,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset({
        date: "",
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      });
    }
  }, [isOpen, reset]);

  if (!can(PERMISSIONS.MEAL_REQUEST_CREATE)) {
    return null;
  }

  const onSubmit = (values: ICreateMealRequestByDatePayload) => {
    createMutation.mutate(values, {
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
      title="Add Meal Request"
      isEdit={false}
      isPending={createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={PERMISSIONS.MEAL_REQUEST_CREATE}
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Date{" "}
          <span className="text-theme-text-muted">(Month / Day / Year)</span>
        </label>

        <Input
          type="date"
          placeholder="mm / dd / yyyy"
          className="w-full text-theme-text-muted"
          error={errors.date?.message}
          {...register("date")}
        />
      </div>

      {mealFields.map((meal) => (
        <MealCounterField
          key={meal.name}
          name={meal.name}
          label={meal.label}
          control={control}
          max={mealSetting?.maxMealPerRequest}
          error={errors[meal.name]?.message}
        />
      ))}
    </RecordFormModal>
  );
};
