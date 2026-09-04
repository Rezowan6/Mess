import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MealCounterField } from "@/modules/meal-request/components/MealCounterField";
import { mealFields } from "@/modules/meal-request/configs/mealFields";
import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";

import { Button } from "@/shared/components/ui/Button";

import { useCreateMealRequest } from "../hooks/useCreateMealRequest";
import { mealRequestSchema } from "../schemas/mealRequest.schema";
import type { ICreateMealRequestPayload } from "../types/mealRequest.types";
import type z from "zod";

type MealRequestFormInput = z.input<typeof mealRequestSchema>;
type MealRequestFormOutput = z.output<typeof mealRequestSchema>;

export const MealRequestForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MealRequestFormInput, unknown, MealRequestFormOutput>({
    resolver: zodResolver(mealRequestSchema),
    defaultValues: {
      fromDate: "",
      toDate: "",
      breakfast: 0,
      lunch: 0,
      dinner: 0,
    },
  });

  const { data: mealSettingData } = useMealSetting();

  const mealSetting = mealSettingData?.data;

  const { mutate, isPending } = useCreateMealRequest();

  const onSubmit = (values: ICreateMealRequestPayload) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Date Range */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-base-content">
            From Date
          </label>

          <input
            type="date"
            {...register("fromDate")}
            className="input input-bordered w-full"
          />

          {errors.fromDate && (
            <p className="mt-1 text-xs text-error">{errors.fromDate.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-base-content">
            To Date
          </label>

          <input
            type="date"
            {...register("toDate")}
            className="input input-bordered w-full"
          />

          {errors.toDate && (
            <p className="mt-1 text-xs text-error">{errors.toDate.message}</p>
          )}
        </div>
      </div>

      {/* Meal Selection */}
      <div className="rounded-md bg-info/5 p-4">
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

      {/* Submit */}
      <Button
        type="submit"
        variant="success"
        disabled={isPending}
        loading={isPending}
        loadingText="Creating Request..."
      >
        Create Meal Request
      </Button>
    </form>
  );
};
