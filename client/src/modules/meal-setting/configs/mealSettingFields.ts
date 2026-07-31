import type { MealSettingFormValues } from "../schemas/mealSetting.schema";

interface MealSettingField {
  name: keyof MealSettingFormValues;
  label: string;
  type: string;
  placeholder: string;
  valueAsNumber?: boolean;
}

export const mealSettingFields: MealSettingField[] = [
  {
    name: "breakfastCutoffMinute",
    label: "Breakfast Cutoff Time",
    type: "time",
    placeholder: "Select breakfast cutoff time",
  },
  {
    name: "lunchCutoffMinute",
    label: "Lunch Cutoff Time",
    type: "time",
    placeholder: "Select lunch cutoff time",
  },
  {
    name: "dinnerCutoffMinute",
    label: "Dinner Cutoff Time",
    type: "time",
    placeholder: "Select dinner cutoff time",
  },
];
