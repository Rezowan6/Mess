import {
  Banknote,
  Calculator,
  CircleDollarSign,
  Scale,
  Wallet,
} from "lucide-react";
import type { IMealCalculationSummary } from "../types/myProfile.types";

interface MyProfileInfoCardConfig {
  key: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export const getMyProfileInfoCards = (
  summary: IMealCalculationSummary,
): MyProfileInfoCardConfig[] => [
  {
    key: "deposit",
    title: "Total Deposit",
    value: `৳ ${summary.deposit}`,
    icon: <Banknote size={22} />,
    iconClassName: "text-success",
    valueClassName: "text-success",
  },
  {
    key: "mealRate",
    title: "Meal Rate",
    value: `৳ ${summary.mealRate}`,
    icon: <Calculator size={22} />,
    iconClassName: "text-primary",
    valueClassName: "text-primary",
  },
  {
    key: "normalMealCost",
    title: "Meal Cost",
    value: `৳ ${summary.normalMealCost.toFixed(2)}`,
    icon: <Wallet size={22} />,
    iconClassName: "text-error",
    valueClassName: "text-error",
  },
  {
    key: "partyCost",
    title: "Party Cost",
    value: `৳ ${summary.partyCost.toFixed(2)}`,
    icon: <Wallet size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-warning",
  },
  {
    key: "memberCost",
    title: "Total Cost",
    value: `৳ ${summary.memberCost.toFixed(2)}`,
    icon: <Wallet size={22} />,
    iconClassName: "text-error",
    valueClassName: "text-error",
  },
  {
    key: "balance",
    title: "Balance",
    value: `৳ ${summary.balance}`,
    icon: <Scale size={22} />,
    iconClassName: summary.balance >= 0 ? "text-success" : "text-error",
    valueClassName: summary.balance >= 0 ? "text-success" : "text-error",
  },
  {
    key: "status",
    title: "Status",
    value: summary.status,
    icon: <CircleDollarSign size={22} />,
    iconClassName:
      summary.status === "Received"
        ? "text-success"
        : summary.status === "Settled"
          ? "text-info"
          : "text-error",
    valueClassName:
      summary.status === "Received"
        ? "text-success"
        : summary.status === "Settled"
          ? "text-info"
          : "text-error",
  },
];
