import { Badge } from "@/shared/components/ui/Badge";
import { IconBox } from "@/shared/components/ui/IconBox";
import {
  CalendarClock,
  CreditCard,
  Crown,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { ReactNode } from "react";

export interface SubscriptionSummaryCard {
  title: string;
  value: ReactNode;
  icon: LucideIcon | ReactNode;
  iconClassName?: string;
}

export const subscriptionSummaryCards = [
  {
    title: "Current Plan",
    value: "Standard",
    icon: <IconBox className="bg-warning/20 text-warning" icon={<Crown />} />,
  },

  {
    title: "Subscription Status",
    value: (
      <Badge variant="success" size="sm">
        Active
      </Badge>
    ),
    icon: <IconBox className="bg-success/20 text-success" icon={<Wallet />} />,
  },
  {
    title: "Current Amount",
    value: "৳299",
    icon: <IconBox className="bg-info/20 text-info" icon={<CreditCard />} />,
  },

  {
    title: "Next Renewal",
    value: "15 Aug 2026",
    icon: (
      <IconBox
        className="bg-secondary/20 text-secondary"
        icon={<CalendarClock />}
      />
    ),
  },
] as const;
