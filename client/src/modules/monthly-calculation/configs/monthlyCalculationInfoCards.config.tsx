import { Banknote, Calculator, Utensils, Wallet } from "lucide-react";

interface MonthlyCalculationInfoCardConfig {
  key: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export const getMonthlyCalculationInfoCards = (calculation: {
  totalExpense: number;
  totalPartyExpense: number;
  totalEggCost: number;
  totalMealCost: number;
  totalDeposit: string | number;
  grandTotalMeals: number;
  mealRate: number;
}): MonthlyCalculationInfoCardConfig[] => [
  {
    key: "totalDeposit",
    title: "Total Deposit",
    value: `৳ ${calculation.totalDeposit}`,
    icon: <Banknote size={22} />,
    iconClassName: "text-success",
    valueClassName: "text-success",
  },
  {
    key: "totalPartyExpense",
    title: "Total Party Cost",
    value: `৳ ${calculation.totalPartyExpense}`,
    icon: <Wallet size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-warning",
  },

  {
    key: "totalEggCost",
    title: "Total Egg Cost",
    value: `৳ ${calculation.totalEggCost}`,
    icon: <Wallet size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-warning",
  },
  {
    key: "totalMealCost",
    title: "Total Meal Cost",
    value: `৳ ${calculation.totalMealCost}`,
    icon: <Wallet size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-warning",
  },

  {
    key: "totalExpense",
    title: "Total Expense",
    value: `৳ ${calculation.totalExpense}`,
    icon: <Wallet size={22} />,
    iconClassName: "text-error",
    valueClassName: "text-error",
  },
  {
    key: "grandTotalMeals",
    title: "Grand Total Meals",
    value: calculation.grandTotalMeals,
    icon: <Utensils size={22} />,
    iconClassName: "text-info",
    valueClassName: "text-info",
  },
  {
    key: "mealRate",
    title: "Meal Rate",
    value: `৳ ${calculation.mealRate}`,
    icon: <Calculator size={22} />,
    iconClassName: "text-primary",
    valueClassName: "text-primary",
  },
];
