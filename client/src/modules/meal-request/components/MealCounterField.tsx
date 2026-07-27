import type { IUpsertMealPreferenceDto } from "@/modules/meal-preference/types/mealPreference.types";
import { ToggleCounter } from "@/shared/components/ui/ToggleCounter";
import { Controller, type Control } from "react-hook-form";

interface IMealCounterFieldProps {
  name: "breakfast" | "lunch" | "dinner";
  label: string;
  control: Control<IUpsertMealPreferenceDto>;
  max?: number;
  error?: string;
}

export function MealCounterField({
  name,
  label,
  control,
  max,
  error,
}: IMealCounterFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ToggleCounter
          label={label}
          value={Number(field.value)}
          onChange={field.onChange}
          max={max}
          error={error}
        />
      )}
    />
  );
}
