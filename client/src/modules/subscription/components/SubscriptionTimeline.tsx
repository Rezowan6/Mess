import { CalendarCheck, CreditCard, PlayCircle } from "lucide-react";

import type { ISubscription } from "../types/subscription.types";

interface Props {
  subscription: ISubscription;
}

export const SubscriptionTimeline = ({ subscription }: Props) => {
  const timelineItems = [
    {
      title: "Subscription Started",
      description: `Your ${subscription.plan?.name ?? "plan"} subscription started successfully.`,
      date: subscription.startDate,
      icon: PlayCircle,
    },
    {
      title: "Payment Completed",
      description: "Subscription payment was completed.",
      date: subscription.startDate,
      icon: CreditCard,
    },
    {
      title: "Next Renewal",
      description: subscription.endDate
        ? "Your subscription will renew automatically."
        : "No renewal date available.",
      date: subscription.endDate,
      icon: CalendarCheck,
    },
  ];

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
      <h3 className="mb-6 text-lg font-semibold">Subscription Timeline</h3>

      <ul className="space-y-6">
        {timelineItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={20} className="text-info" />
              </div>

              <div>
                <h4 className="font-semibold">{item.title}</h4>

                <p className="text-sm text-base-content/70">
                  {item.description}
                </p>

                <span className="mt-1 block text-xs text-base-content/50">
                  {formatDate(item.date)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
