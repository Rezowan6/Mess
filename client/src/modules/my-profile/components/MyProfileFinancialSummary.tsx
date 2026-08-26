import {
  ArrowDownToLine,
  CircleDollarSign,
  Receipt,
  Utensils,
} from "lucide-react";

import type { IMealCalculationSummary } from "../types/myProfile.types";

interface Props {
  summary: IMealCalculationSummary;
}

export const MyProfileFinancialSummary = ({ summary }: Props) => {
  const cards = [
    {
      title: "Total Deposit",
      value: `৳ ${summary.deposit.toFixed(2)}`,
      icon: ArrowDownToLine,
      className: "text-success",
    },
    {
      title: "Meal Cost",
      value: `৳ ${summary.normalMealCost.toFixed(2)}`,
      icon: Utensils,
      className: "text-primary",
    },
    {
      title: "Party Cost",
      value: `৳ ${summary.partyCost.toFixed(2)}`,
      icon: Receipt,
      className: "text-warning",
    },
    {
      title: "Total Cost",
      value: `৳ ${summary.memberCost.toFixed(2)}`,
      icon: CircleDollarSign,
      className: "text-error",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl bg-info/10 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`mb-3 ${item.className}`}>
              <Icon size={22} />
            </div>

            <p className="text-sm opacity-60">{item.title}</p>

            <p className={`mt-1 text-xl font-bold`}>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};
