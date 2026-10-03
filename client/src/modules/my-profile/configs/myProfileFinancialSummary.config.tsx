import type { FinancialSummaryItem } from "@/shared/components/ui/FinancialSummary";
import type { IMealCalculationSummary } from "../types/myProfile.types";

const CURRENCY_PREFIX = "৳ ";

export const MyProfileFinancialSummaryConfig = (
  summary: IMealCalculationSummary,
): FinancialSummaryItem[] => [
  {
    key: "total-deposit",
    title: "Total Deposit",
    amount: summary.deposit,
    prefix: CURRENCY_PREFIX,
    className: "text-success",
  },
  {
    key: "meal-cost",
    title: "Meal Cost",
    amount: summary.normalMealCost,
    prefix: CURRENCY_PREFIX,
    className: "text-primary",
  },
  {
    key: "party-cost",
    title: "Party Cost",
    amount: summary.partyCost,
    prefix: CURRENCY_PREFIX,
    className: "text-warning",
  },
  {
    key: "egg-cost",
    title: "Egg Cost",
    amount: summary.eggCost,
    prefix: CURRENCY_PREFIX,
    className: "text-warning",
  },
  {
    key: "total-cost",
    title: "Total Cost",
    amount: summary.memberCost,
    prefix: CURRENCY_PREFIX,
    className: "text-error",
  },
];
