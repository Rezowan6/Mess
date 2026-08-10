import { CalendarDays, Crown, Users } from "lucide-react";
import type { ReactNode } from "react";

import { IconBox } from "@/shared/components/ui/IconBox";

import type { ISubscription } from "../types/subscription.types";

export interface PlanInfoItem {
  title: string;
  value: ReactNode;
  icon: ReactNode;
}

export const getPlanInfo = (
  subscription: ISubscription,
): PlanInfoItem[] => [
  {
    title: "Monthly Price",
    value: `৳${subscription.plan?.monthlyPrice ?? "0.00"}`,
    icon: (
      <IconBox
        className="bg-info/20 text-info"
        icon={<Crown size={18} />}
      />
    ),
  },
  {
    title: "Yearly Price",
    value: `৳${subscription.plan?.yearlyPrice ?? "0.00"}`,
    icon: (
      <IconBox
        className="bg-success/20 text-success"
        icon={<CalendarDays size={18} />}
      />
    ),
  },
  {
    title: "Max Members",
    value:
      subscription.plan?.maxMembers === -1
        ? "Unlimited"
        : (subscription.plan?.maxMembers ?? "N/A"),
    icon: (
      <IconBox
        className="bg-warning/20 text-warning"
        icon={<Users size={18} />}
      />
    ),
  },
];