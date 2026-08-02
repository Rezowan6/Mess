import {
  Banknote,
  Calculator,
  CircleDollarSign,
  Scale,
  Utensils,
  Wallet,
} from "lucide-react";

interface MyProfileInfoCardConfig {
  key: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export const getMyProfileInfoCards = (summary: {
  totalMeal: number;
  deposit: number;
  mealRate: number;
  memberCost: number;
  balance: number;
  status: string;
}): MyProfileInfoCardConfig[] => [
  {
    key: "totalMeal",
    title: "Total Meals",
    value: summary.totalMeal,
    icon: <Utensils size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-warning",
  },
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
    key: "memberCost",
    title: "Meal Cost",
    value: `৳ ${summary.memberCost}`,
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
