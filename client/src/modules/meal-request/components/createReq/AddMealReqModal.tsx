import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

import { MealCounterField } from "@/modules/meal-request/components/createReq/MealCounterField";
import { mealFields } from "@/modules/meal-request/configs/mealFields";
import { useCreateMealRequest } from "@/modules/meal-request/hooks/useCreateMealRequest";
import { mealRequestSchema } from "@/modules/meal-request/schemas/mealRequest.schema";
import type { ICreateMealRequestPayload } from "@/modules/meal-request/types/mealRequest.types";
import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";

import { SkippedDatesCard } from "@/shared/components/feedback/SkippedDatesCard";
import { Input } from "@/shared/components/ui/Input";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { mealRequestDateFields } from "../../configs/mealRequestDateFields.config";

type MealRequestFormInput = z.input<typeof mealRequestSchema>;
type MealRequestFormOutput = z.output<typeof mealRequestSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMealReqModal = ({ isOpen, onClose }: Props) => {
  const { can } = useRBAC();
  const { data: mealSettingData } = useMealSetting();
  const mealSetting = mealSettingData?.data;

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
    reset,
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

  const createMutation = useCreateMealRequest(setRequestResult);

  useEffect(() => {
    if (!isOpen) {
      reset({
        fromDate: "",
        toDate: "",
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      });
      setRequestResult(null);
    }
  }, [isOpen, reset]);

  if (!can(PERMISSIONS.MEAL_REQUEST_CREATE)) {
    return null;
  }

  const onSubmit = (values: ICreateMealRequestPayload) => {
    createMutation.mutate(values);
  };

  return (
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Meal Requests"
      isEdit={false}
      isPending={createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={PERMISSIONS.MEAL_REQUEST_CREATE}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mealRequestDateFields.map((field) => (
          <div key={field.name}>
            <label className="mb-1 block text-sm font-medium">
              {field.label}{" "}
              <span className="text-theme-text-muted">
                (Month / Day / Year)
              </span>
            </label>

            <Input
              type="date"
              placeholder={field.placeholder}
              className="w-full text-theme-text-muted"
              error={errors[field.name]?.message}
              {...register(field.name)}
            />
          </div>
        ))}
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

      <SkippedDatesCard items={requestResult?.skippedRequests ?? []} />
    </RecordFormModal>
  );
};
