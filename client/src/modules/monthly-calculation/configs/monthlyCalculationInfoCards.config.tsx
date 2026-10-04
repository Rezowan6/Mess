import type { ReactNode } from "react";

export type MonthlyCalculationTone =
  "info" | "success" | "accent" | "secondary" | "error" | "warning";

export interface MonthlyCalculationInfoCardConfig {
  key: string;
  label: string;
  amount: number;
  tone: MonthlyCalculationTone;
  icon?: ReactNode;
  prefix?: string;
  decimals?: number;
  hint?: ReactNode;
}

export interface MonthlyCalculationData {
  totalExpense: number;
  totalPartyExpense: number;
  totalEggCost: number;
  totalRiceExpense: number;
  totalMealCost: number;
  totalSoldProductAmount: number;
  totalDeposit: string | number;
  grandTotalMeals: number;
  mealRate: number;
}

export const getMonthlyCalculationInfoCards = (
  calculation: MonthlyCalculationData,
): MonthlyCalculationInfoCardConfig[] => [
  // ============================================================
  // BASE EXPENSE
  // ============================================================
  {
    key: "totalExpense",
    label: "Base Expense",
    amount: calculation.totalExpense,
    tone: "error",
    hint: "Starting expense",
  },

  // ============================================================
  // ADDITIONS / DEDUCTIONS
  // ============================================================
  {
    key: "totalRiceExpense",
    label: "Rice Expense",
    amount: calculation.totalRiceExpense,
    tone: "secondary",
    hint: "+ Added to meal cost",
  },

  {
    key: "totalPartyExpense",
    label: "Party Cost",
    amount: calculation.totalPartyExpense,
    tone: "warning",
    hint: "− Excluded from meal rate",
  },

  {
    key: "totalEggCost",
    label: "Egg Cost",
    amount: calculation.totalEggCost,
    tone: "warning",
    hint: "− Excluded from meal rate",
  },

  {
    key: "totalSoldProductAmount",
    label: "Sold Product",
    amount: calculation.totalSoldProductAmount,
    tone: "accent",
    hint: "− Deducted from meal cost",
  },

  // ============================================================
  // FINAL MEAL CALCULATION
  // ============================================================
  {
    key: "totalMealCost",
    label: "Meal Cost",
    amount: calculation.totalMealCost,
    tone: "info",
    hint: "Final cost used for meal rate",
  },

  {
    key: "grandTotalMeals",
    label: "Total Meals",
    amount: calculation.grandTotalMeals,
    tone: "info",
    prefix: "",
    decimals: 2,
    hint: "Divisor for meal rate",
  },

  {
    key: "mealRate",
    label: "Meal Rate",
    amount: calculation.mealRate,
    tone: "info",
    hint: "Meal Cost ÷ Total Meals",
  },

  // ============================================================
  // DEPOSIT
  // ============================================================
  {
    key: "totalDeposit",
    label: "Total Deposit",
    amount: Number(calculation.totalDeposit),
    tone: "success",
    hint: "Total member deposits",
  },
];
