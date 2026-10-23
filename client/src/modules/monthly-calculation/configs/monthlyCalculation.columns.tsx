import { Badge } from "@/shared/components/ui/Badge";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { TableColumn } from "@/shared/components/ui/Table";
import { formatTaka } from "@/shared/utils/format.utils";

import type { IMonthlyCalculationMember } from "../types/monthlyCalculation.types";

const getStatusVariant = (
  status: IMonthlyCalculationMember["status"],
): "soft-error" | "soft-success" | "soft-info" => {
  switch (status) {
    case "Payable":
      return "soft-error";
    case "Received":
      return "soft-success";
    default:
      return "soft-info";
  }
};

export const useMonthlyCalculationColumns =
  (): TableColumn<IMonthlyCalculationMember>[] => {
    return [
      {
        key: "name",
        title: "Member",
        render: (member) => (
          <MemberAvatar name={member.name} avatar={member.avatar} />
        ),
      },
      {
        key: "deposit",
        title: "Deposit",
        render: (member) => (
          <span className="text-theme-success font-bold">
            {formatTaka(member.deposit ?? 0)}
          </span>
        ),
      },
      {
        key: "totalMeal",
        title: "Meal",
        render: (member) => (
          <span className="text-theme-text">{member.totalMeal ?? 0}</span>
        ),
      },
      {
        key: "totalMealCost",
        title: "Meal Cost",
        render: (member) => (
          <span className="font-medium text-theme-warning">
            {formatTaka(member.normalMealCost ?? 0)}
          </span>
        ),
      },
      {
        key: "partyCost",
        title: "Party Cost",
        render: (member) => (
          <span className="font-medium text-theme-warning">
            {formatTaka(member.partyCost ?? 0)}
          </span>
        ),
      },
      {
        key: "eggCost",
        title: "Egg Cost",
        render: (member) => (
          <span className="font-medium text-theme-warning">
            {formatTaka(member.eggCost ?? 0)}
          </span>
        ),
      },
      {
        key: "memberTotalCost",
        title: "Total Cost",
        render: (member) => (
          <span className="font-semibold text-theme-text">
            {formatTaka(member.memberCost ?? 0)}
          </span>
        ),
      },
      {
        key: "balance",
        title: "Balance",
        render: (member) => {
          const balance = Number(member.balance ?? 0);

          return (
            <span
              className={`font-semibold ${
                balance < 0
                  ? "text-theme-danger"
                  : balance > 0
                    ? "text-theme-success"
                    : "text-theme-text-muted"
              }`}
            >
              {formatTaka(Math.abs(balance))}
            </span>
          );
        },
      },
      {
        key: "status",
        title: "Status",
        render: (member) => (
          <Badge size="sm" variant={getStatusVariant(member.status)}>
            {member.status}
          </Badge>
        ),
      },
    ];
  };
