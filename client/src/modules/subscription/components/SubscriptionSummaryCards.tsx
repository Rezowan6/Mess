import { InfoCard } from "@/shared/components/ui/InfoCard";

import { getSubscriptionSummaryCards } from "../configs/subscriptionSummary.config";
import type { ISubscription } from "../types/subscription.types";

interface Props {
  subscription: ISubscription;
}

export const SubscriptionSummaryCards = ({ subscription }: Props) => {
  const cards = getSubscriptionSummaryCards(subscription);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <InfoCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
};
