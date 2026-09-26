import type { TableColumn } from "@/shared/components/ui/Table";

import { Badge } from "@/shared/components/ui/Badge";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { IMonthlyCalculationMember } from "../types/monthlyCalculation.types";

export const useMonthlyCalculationColumns =
  (): TableColumn<IMonthlyCalculationMember>[] => {
    return [
      {
        key: "name",
        title: "Member",
        render: (member) => (
          <MemberAvatar name={member?.name} avatar={member?.avatar} />
        ),
      },
      {
        key: "deposit",
        title: "Deposit",
        render: (member) => `৳ ${member.deposit}`,
      },
      {
        key: "totalMeal",
        title: "Meal",
        render: (member) => member.totalMeal,
      },
      {
        key: "totalMealCost",
        title: "Meal Cost",
        render: (member) => (
          <span className="text-warning">
            ৳ {member?.normalMealCost.toFixed(2)}
          </span>
        ),
      },
      {
        key: "partyCost",
        title: "Party Cost",
        render: (member) => (
          <span className="text-warning">৳ {member.partyCost.toFixed(2)}</span>
        ),
      },
      {
        key: "eggCost",
        title: "Egg Cost",
        render: (member) => (
          <span className="text-warning">৳ {member.eggCost.toFixed(2)}</span>
        ),
      },
      {
        key: "memberTotalCost",
        title: "Total Cost",
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
          <Badge
            size="sm"
            variant={`${
              member.status === "Payable"
                ? "accent"
                : member.status === "Received"
                  ? "success"
                  : "primary"
            }`}
          >
            {member.status}
          </Badge>
        ),
      },
    ];
  };
