import { Coffee, Moon, Sun } from "lucide-react";
import type { mealSummary } from "../types/myProfile.types";

// Meals can be fractional (e.g. half meal), so keep decimals only when needed
export const getMealDecimals = (value: number) =>
  Number.isInteger(value) ? 0 : 2;

export const myProfileMealBreakdownConfig = (summary: mealSummary) => [
  {
    id: "breakfast",
    label: "Breakfast",
    amount: summary.breakfast,
    prefix: "+",
    decimals: getMealDecimals(summary.breakfast),
    icon: Coffee,
    iconClassName: "text-theme-info",
  },
  {
    id: "lunch",
    label: "Lunch",
    amount: summary.lunch,
    prefix: "+",
    decimals: getMealDecimals(summary.lunch),
    icon: Sun,
    iconClassName: "text-theme-info",
  },
  {
    id: "dinner",
    label: "Dinner",
    amount: summary.dinner,
    prefix: "+",
    decimals: getMealDecimals(summary.dinner),
    icon: Moon,
    iconClassName: "text-theme-info",
  },
];