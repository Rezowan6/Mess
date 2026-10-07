import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MealCounterField } from "@/modules/meal-request/components/createReq/MealCounterField";
import { mealFields } from "@/modules/meal-request/configs/mealFields";
import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";

import { Button } from "@/shared/components/ui/Button";

import { SkippedDatesCard } from "@/shared/components/feedback/SkippedDatesCard";
import { Input } from "@/shared/components/ui/Input";
import { useState } from "react";
import type z from "zod";
import { useCreateMealRequest } from "../../hooks/useCreateMealRequest";
import { mealRequestSchema } from "../../schemas/mealRequest.schema";
import type { ICreateMealRequestPayload } from "../../types/mealRequest.types";

type MealRequestFormInput = z.input<typeof mealRequestSchema>;
type MealRequestFormOutput = z.output<typeof mealRequestSchema>;

export const MealRequestForm = ({ onClose }: { onClose: () => void }) => {
  const [requestResult, setRequestResult] = useState<{
    createdCount: number;
    skippedCount: number;
    totalRequestedDays: number;
    skippedRequests: {
      date: string;
      reason: string;
    }[];
  } | null>(null);
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

  const { mutate, isPending } = useCreateMealRequest(setRequestResult);

  const onSubmit = (values: ICreateMealRequestPayload) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Date Range */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-theme-text-muted">
              From Date{" "}
              <span >(Month / Day / Year)</span>
            </label>

            <Input
              type="date"
              placeholder="mm / dd / yyyy"
              {...register("fromDate")}
              className="w-full text-theme-text-muted"
              error={errors?.fromDate?.message}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-theme-text-muted">
              To Date{" "}
              <span className="">(Month / Day / Year)</span>
            </label>

            <Input
              type="date"
              placeholder="mm / dd / yyyy"
              {...register("toDate")}
              className=" w-full text-theme-text-muted"
              error={errors?.toDate?.message}
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

      <SkippedDatesCard items={requestResult?.skippedRequests ?? []} />
    </>
  );
};
