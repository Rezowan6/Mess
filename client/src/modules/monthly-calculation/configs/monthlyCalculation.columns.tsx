import type { TableColumn } from "@/shared/components/ui/Table";

import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import type { IMonthlyCalculationMember } from "../types/monthlyCalculation.types";

export const useMonthlyCalculationColumns =
  (): TableColumn<IMonthlyCalculationMember>[] => {
    return [
      {
        key: "name",
        title: "Member",
        render: (member) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar
                size="sm"
                fallback={getAvatarInitial(member?.name ?? "", member?.avatar)}
              />

              <span className="font-medium">{member?.name ?? ""}</span>
            </div>
          );
        },
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
