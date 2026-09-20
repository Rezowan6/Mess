import type { IMealType } from "../types/mealPlanning.types";

export const mealTabs: {
  key: IMealType;
  label: string;
  disabled?: boolean | undefined;
}[] = [
  {
    key: "breakfast",
    label: "Breakfast",
  },
  {
    key: "lunch",
    label: "Lunch",
  },
  {
    key: "dinner",
    label: "Dinner",
  },
  {
    key: "guest",
    label: "Guest",
    disabled: true,
  },
];
