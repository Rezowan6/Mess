import { IconBox } from "@/shared/components/ui/IconBox";

import { CalendarClock, CreditCard, Crown, Wallet } from "lucide-react";

import type { ReactNode } from "react";

import { SubscriptionStatusBadge } from "../components/SubscriptionStatusBadge";
import type { ISubscription } from "../types/subscription.types";

export interface SubscriptionSummaryCard {
  title: string;
  value: ReactNode;
  icon: ReactNode;
}

export const getSubscriptionSummaryCards = (
  subscription: ISubscription,
): SubscriptionSummaryCard[] => [
  {
    title: "Current Plan",
    value: subscription?.plan?.name ?? "N/A",
    icon: <IconBox className="bg-warning/20 text-warning" icon={<Crown />} />,
  },

  {
    title: "Subscription Status",
    value: <SubscriptionStatusBadge status={subscription.status} />,
    icon: <IconBox className="bg-success/20 text-success" icon={<Wallet />} />,
  },

  {
    title: "Current Amount",
    value: `৳${subscription.amount}`,
    icon: <IconBox className="bg-info/20 text-info" icon={<CreditCard />} />,
  },

  {
    title: "Next Renewal",
    value: subscription.endDate
      ? new Date(subscription.endDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "No Renewal",
    icon: (
      <IconBox
        className="bg-secondary/20 text-secondary"
        icon={<CalendarClock />}
      />
    ),
  },
];
