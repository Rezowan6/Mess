import { ToggleCounter } from "@/shared/components/ui/ToggleCounter";
import { Controller, type Control } from "react-hook-form";
import type { IMealRequestFormValues } from "../schemas/mealRequest.schema";

interface MealCounterFieldProps {
  name: "breakfast" | "lunch" | "dinner";
  label: string;
  control: Control<IMealRequestFormValues>;
  max?: number;
  error?: string;
}

export function MealCounterField({
  name,
  label,
  control,
  max,
  error,
}: MealCounterFieldProps) {
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
