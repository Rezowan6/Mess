import { Calendar, CreditCard, Crown, Gift } from "lucide-react";
import type { ReactNode } from "react";

import { IconBox } from "@/shared/components/ui/IconBox";

import { formatDate } from "@/shared/utils/date.utils";
import type { ISubscription } from "../types/subscription.types";

export interface SubscriptionInfoItem {
  title: string;
  value: ReactNode;
  icon: ReactNode;
}

export const getSubscriptionInfo = (
  subscription: ISubscription,
): SubscriptionInfoItem[] => [
  {
    title: "Plan",
    value: subscription.plan?.name ?? "N/A",
    icon: (
      <IconBox
        className="bg-warning/20 text-warning"
        icon={<Crown size={18} />}
      />
    ),
  },
  {
    title: "Amount",
    value: `৳${subscription.amount}`,
    icon: (
      <IconBox
        className="bg-info/20 text-info"
        icon={<CreditCard size={18} />}
      />
    ),
  },
  {
    title: "Free Trial",
    value: subscription.isFreeTrial ? "Yes" : "No",
    icon: (
      <IconBox
        className="bg-success/20 text-success"
        icon={<Gift size={18} />}
      />
    ),
  },
  {
    title: "Start Date",
    value: formatDate(subscription.startDate),
    icon: (
      <IconBox
        className="bg-primary/20 text-primary"
        icon={<Calendar size={18} />}
      />
    ),
  },
  {
    title: "End Date",
    value: subscription.endDate ? formatDate(subscription.endDate) : "N/A",
    icon: (
      <IconBox
        className="bg-secondary/20 text-secondary"
        icon={<Calendar size={18} />}
      />
    ),
  },
];
