import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MealCounterField } from "@/modules/meal-request/components/createReq/MealCounterField";
import { mealFields } from "@/modules/meal-request/configs/mealFields";
import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";

import { Button } from "@/shared/components/ui/Button";

import { Input } from "@/shared/components/ui/Input";
import type z from "zod";
import { useCreateMealRequestByDate } from "../../hooks/useCreateMealRequestByDate";
import { mealRequestSchemaByDate } from "../../schemas/mealRequest.schema";
import type { ICreateMealRequestByDatePayload } from "../../types/mealRequest.types";

type MealRequestFormInput = z.input<typeof mealRequestSchemaByDate>;
type MealRequestFormOutput = z.output<typeof mealRequestSchemaByDate>;

export const MealRequestFormByDate = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    control,
    handleSubmit,
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

  const { data: mealSettingData } = useMealSetting();

  const mealSetting = mealSettingData?.data;

  const { mutate, isPending } = useCreateMealRequestByDate();

  const onSubmit = (values: ICreateMealRequestByDatePayload) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Date Range */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-theme-text-muted">
              Date <span>(Month / Day / Year)</span>
            </label>

            <Input
              type="date"
              placeholder="mm / dd / yyyy"
              {...register("date")}
              className="w-full text-theme-text-muted"
              error={errors?.date?.message}
            />
          </div>
        </div>

        {/* Meal Selection */}

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

        {/* Submit */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="error" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
            disabled={isPending}
            loading={isPending}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
