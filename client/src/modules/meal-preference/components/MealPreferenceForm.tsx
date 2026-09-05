import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";

import { useMealPreference } from "../hooks/useMealPreference";
import { useUpsertMealPreference } from "../hooks/useUpsertMealPreference";

import { MealCounterField } from "@/modules/meal-request/components/createReq/MealCounterField";
import { mealFields } from "@/modules/meal-request/configs/mealFields";
import { useMealSetting } from "@/modules/meal-setting/hooks/useMealSetting";
import type { IUpsertMealPreferenceDto } from "../types/mealPreference.types";
import { MealPreferenceSkeleton } from "./MealPreferenceSkeleton";

export const MealPreferenceForm = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<IUpsertMealPreferenceDto>({
    defaultValues: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      guestMeal: 0,
    },
  });

  const { data: preferenceData, isLoading } = useMealPreference();
  const hasPreference = Boolean(preferenceData?.data);

  const { data: mealSettingData } = useMealSetting();
  const mealSetting = mealSettingData?.data;

  useEffect(() => {
    if (!preferenceData?.data) return;

    reset({
      breakfast: preferenceData.data.breakfast,
      lunch: preferenceData.data.lunch,
      dinner: preferenceData.data.dinner,
      guestMeal: preferenceData.data.guestMeal,
    });
  }, [preferenceData, reset]);

  const { mutate, isPending } = useUpsertMealPreference();

  const onSubmit = (values: IUpsertMealPreferenceDto) => {
    mutate(values, {
      onError: () => {
        if (!preferenceData?.data) return;
        reset({
          breakfast: Number(preferenceData.data.breakfast),
          lunch: Number(preferenceData.data.lunch),
          dinner: Number(preferenceData.data.dinner),
          guestMeal: Number(preferenceData.data.guestMeal),
        });
      },
    });
  };

  if (isLoading) {
    return <MealPreferenceSkeleton />;
  }

  return (
    <div>
      {!hasPreference && (
        <div>
          <p className="text-text-muted">
            You haven't set your meal preference yet.
          </p>
          <p className="text-xs text-info">
            Save your preference to enable automatic meal requests.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 bg-info/5 p-4 rounded-md">
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
        <Button
          type="submit"
          variant="success"
          disabled={!isDirty || isPending}
          loading={isPending}
          loadingText="Save Preferenceing..."
        >
          Save Preference
        </Button>
      </form>
    </div>
  );
};
