import { ToggleCounter } from "@/shared/components/ui/ToggleCounter";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface IMealCounterFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  max?: number;
  error?: string;
}

export function MealCounterField<T extends FieldValues>({
  name,
  label,
  control,
  max,
  error,
}: IMealCounterFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ToggleCounter
          label={label}
          value={Number(field.value ?? 0)}
          onChange={field.onChange}
          max={max}
          error={error}
        />
      )}
    />
  );
}
