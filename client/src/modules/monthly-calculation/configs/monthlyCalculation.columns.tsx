import type { TableColumn } from "@/shared/components/ui/Table";

import type { IMonthlyCalculationMember } from "../types/monthlyCalculation.types";

export const useMonthlyCalculationColumns =
  (): TableColumn<IMonthlyCalculationMember>[] => {
    return [
      {
        key: "name",
        title: "Member",
        render: (member) => member.name,
      },
      {
        key: "totalMeal",
        title: "Total Meal",
        render: (member) => member.totalMeal,
      },
      {
        key: "deposit",
        title: "Deposit",
        render: (member) => `৳ ${member.deposit}`,
      },
      {
        key: "memberCost",
        title: "Member Cost",
        hideOnMobile: true,
        render: (member) => `৳ ${member.memberCost.toFixed(2)}`,
      },
      {
        key: "balance",
        title: "Balance",
        render: (member) => (
          <span className={member.balance < 0 ? "text-error" : "text-success"}>
            ৳ {Math.abs(member.balance).toFixed(2)}
          </span>
        ),
      },
      {
        key: "status",
        title: "Status",
        render: (member) => (
          <span
            className={`badge p-2 ${
              member.status === "Payable"
                ? "bg-gradient-accent"
                : member.status === "Received"
                  ? "bg-gradient-success"
                  : "bg-gradient-primary"
            }`}
          >
            {member.status}
          </span>
        ),
      },
    ];
  };
