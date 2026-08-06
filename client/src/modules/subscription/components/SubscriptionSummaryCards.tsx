import { InfoCard } from "@/shared/components/ui/InfoCard";

import { subscriptionSummaryCards } from "../configs/subscriptionSummary.config";

export const SubscriptionSummaryCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {subscriptionSummaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <InfoCard
            key={card.title}
            icon={<Icon size={22} />}
            title={card.title}
            value={card.value}
            iconClassName={card.iconClassName}
          />
        );
      })}
    </div>
  );
};
