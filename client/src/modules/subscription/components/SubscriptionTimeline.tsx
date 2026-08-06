import { CalendarCheck, CreditCard, PlayCircle } from "lucide-react";

const timelineItems = [
  {
    title: "Subscription Started",
    description: "Your Standard plan subscription started successfully.",
    date: "01 Aug 2026",
    icon: PlayCircle,
  },
  {
    title: "Payment Completed",
    description: "Monthly subscription payment was completed.",
    date: "01 Aug 2026",
    icon: CreditCard,
  },
  {
    title: "Next Renewal",
    description: "Your subscription will renew automatically.",
    date: "01 Sep 2026",
    icon: CalendarCheck,
  },
];

export const SubscriptionTimeline = () => {
  return (
    <div className="rounded-2xl bg-success/10 p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">Subscription Timeline</h3>

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
                  {item.date}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
