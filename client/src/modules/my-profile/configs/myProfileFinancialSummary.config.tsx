import type { FinancialSummaryItem } from "@/shared/components/ui/FinancialSummary";
import type { IMealCalculationSummary } from "../types/myProfile.types";

const CURRENCY_PREFIX = "৳ ";

export const MyProfileFinancialSummaryConfig = (
  summary: IMealCalculationSummary,
): FinancialSummaryItem[] => [
  {
    key: "total-deposit",
    label: "Total Deposit",
    amount: summary.deposit,
    prefix: CURRENCY_PREFIX,
    className: "text-theme-success",
  },
  {
    key: "meal-cost",
    label: "Meal Cost",
    amount: summary.normalMealCost,
    prefix: CURRENCY_PREFIX,
    className: "text-theme-brand",
  },
  {
    key: "party-cost",
    label: "Party Cost",
    amount: summary.partyCost,
    prefix: CURRENCY_PREFIX,
    className: "text-theme-warning",
  },
  {
    key: "egg-cost",
    label: "Egg Cost",
    amount: summary.eggCost,
    prefix: CURRENCY_PREFIX,
    className: "text-theme-warning",
  },
  {
    key: "total-cost",
    label: "Total Cost",
    amount: summary.memberCost,
    prefix: CURRENCY_PREFIX,
    className: "text-theme-danger",
  },
];
