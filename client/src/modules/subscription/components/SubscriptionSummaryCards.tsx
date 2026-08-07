import { InfoCard } from "@/shared/components/ui/InfoCard";

import { subscriptionSummaryCards } from "../configs/subscriptionSummary.config";

export const SubscriptionSummaryCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {subscriptionSummaryCards.map((card) => {
        

        return (
          <InfoCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={card.value}
          />
        );
      })}
    </div>
  );
};
