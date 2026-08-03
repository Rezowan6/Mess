import { Coffee, Soup, Utensils, UtensilsCrossed } from "lucide-react";

interface MonthlyMealSummaryCardConfig {
  key: string;
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export const getMonthlyMealSummaryCards = (summary: {
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
}): MonthlyMealSummaryCardConfig[] => [
  {
    key: "breakfast",
    title: "Breakfast",
    value: summary.breakfast,
    icon: <Coffee size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-warning",
  },
  {
    key: "lunch",
    title: "Lunch",
    value: summary.lunch,
    icon: <Soup size={22} />,
    iconClassName: "text-success",
    valueClassName: "text-success",
  },
  {
    key: "dinner",
    title: "Dinner",
    value: summary.dinner,
    icon: <UtensilsCrossed size={22} />,
    iconClassName: "text-primary",
    valueClassName: "text-primary",
  },
  {
    key: "total",
    title: "Total Meals",
    value: summary.total,
    icon: <Utensils size={22} />,
    iconClassName: "text-secondary",
    valueClassName: "text-secondary",
  },
];
