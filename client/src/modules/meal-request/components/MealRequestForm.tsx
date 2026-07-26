import { useEffect } from "react";

import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";
import { Button } from "@/shared/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mealFields } from "../configs/mealFields";
import { useCreateMealRequest } from "../hooks/useCreateMealRequest";
import {
  mealRequestSchema,
  type IMealRequestFormValues,
} from "../schemas/mealRequest.schema";
import { MealCounterField } from "./MealCounterField";

export default function MealRequestForm() {
  const { data: mealSettingData } = useMealSetting();

  /**
   * form
   */
  const {
    reset,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mealRequestSchema),

    defaultValues: {
      note: "",
    },
  });

  const mealSetting = mealSettingData?.data;

  useEffect(() => {
    if (!mealSetting) return;

    const { defaultBreakfastMeal, defaultLunchMeal, defaultDinnerMeal } =
      mealSetting;

    reset({
      breakfast: defaultBreakfastMeal ?? 1,
      lunch: defaultLunchMeal ?? 1,
      dinner: defaultDinnerMeal ?? 1,
      note: "",
    });
  }, [mealSettingData, reset]);

  /**
   * mealRequest hook
   */

  const { mutate, isPending } = useCreateMealRequest();

  const onSubmit = (values: IMealRequestFormValues) => {
    console.log(values);

    mutate(values, {
      onSuccess: () => {
        if (!mealSetting) return;
        reset({
          breakfast: mealSetting.defaultBreakfastMeal,
          lunch: mealSetting.defaultLunchMeal,
          dinner: mealSetting.defaultDinnerMeal,
          note: "",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
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
      </div>

      <div>
        <label className="label">Note</label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Optional note"
          {...register("note")}
        />
        {errors.note && (
          <p className="text-error text-sm mt-1">{errors.note.message}</p>
        )}
      </div>

      <Button
        variant="success"
        type="submit"
        disabled={isPending}
        loading={isPending}
        loadingText="Submitting..."
      >
        Submit Meal Request
      </Button>
    </form>
  );
}
