import { ArrowDownToLine, CircleDollarSign, Receipt, Utensils } from "lucide-react";
import type { FinancialSummaryItem } from "@/shared/components/ui/FinancialSummary";
import type { IMealCalculationSummary } from "../types/myProfile.types";

export const MyProfileFinancialSummaryConfig = (
  summary: IMealCalculationSummary,
): FinancialSummaryItem[] => [
  {
    key: "total-deposit",
    title: "Total Deposit",
    value: `৳ ${summary.deposit.toFixed(2)}`,
    icon: ArrowDownToLine,
    className: "text-success",
  },
  {
    key: "meal-cost",
    title: "Meal Cost",
    value: `৳ ${summary.normalMealCost.toFixed(2)}`,
    icon: Utensils,
    className: "text-primary",
  },
  {
    key: "party-cost",
    title: "Party Cost",
    value: `৳ ${summary.partyCost.toFixed(2)}`,
    icon: Receipt,
    className: "text-warning",
  },
  {
    key: "egg-cost",
    title: "Egg Cost",
    value: `৳ ${summary.eggCost.toFixed(2)}`,
    icon: Receipt,
    className: "text-warning",
  },
  {
    key: "total-cost",
    title: "Total Cost",
    value: `৳ ${summary.memberCost.toFixed(2)}`,
    icon: CircleDollarSign,
    className: "text-error",
  },
];