import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MealCounterField } from "@/modules/meal-request/components/MealCounterField";
import { mealFields } from "@/modules/meal-request/configs/mealFields";
import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";

import { Button } from "@/shared/components/ui/Button";

import { Input } from "@/shared/components/ui/Input";
import type z from "zod";
import { useCreateMealRequest } from "../hooks/useCreateMealRequest";
import { mealRequestSchema } from "../schemas/mealRequest.schema";
import type { ICreateMealRequestPayload } from "../types/mealRequest.types";

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-info/5 px-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-base-content">
            From Date
          </label>

          <Input
            type="date"
            {...register("fromDate")}
            className="w-full"
            error={errors?.fromDate?.message}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-base-content">
            To Date
          </label>

          <Input
            type="date"
            {...register("toDate")}
            className=" w-full"
            error={errors?.toDate?.message}
          />
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
