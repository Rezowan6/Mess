import { CalendarClock, CreditCard, Crown, Wallet } from "lucide-react";

export const subscriptionSummaryCards = [
  {
    title: "Current Plan",
    value: "Standard",
    icon: Crown,
    iconClassName: "rounded-xl bg-primary/10 p-3 text-primary",
  },

  {
    title: "Subscription Status",
    value: "Active",
    icon: Wallet,
    iconClassName: "rounded-xl bg-success/10 p-3 text-success",
  },
  {
    title: "Current Amount",
    value: "৳299",
    icon: CreditCard,
    iconClassName: "rounded-xl bg-info/10 p-3 text-info",
  },

  {
    title: "Next Renewal",
    value: "15 Aug 2026",
    icon: CalendarClock,
    iconClassName: "rounded-xl bg-warning/10 p-3 text-warning",
  },
] as const;
