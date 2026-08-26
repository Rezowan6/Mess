import { Coffee, Moon, Sun } from "lucide-react";
import type { mealSummary } from "../types/myProfile.types";

export const myProfileMealBreakdownConfig = (summary: mealSummary) => {
  const items = [
    {
      id: "breakfast",
      label: "Breakfast",
      value: `+${summary.breakfast}`,
      icon: Coffee,
      iconClassName: "text-info",
    },
    {
      id: "lunch",
      label: "Lunch",
      value: `+${summary.lunch}`,
      icon: Sun,
      iconClassName: "text-info",
    },
    {
      id: "dinner",
      label: "Dinner",
      value: `+${summary.dinner}`,
      icon: Moon,
      iconClassName: "text-info",
    },
  ];

  return items;
};
