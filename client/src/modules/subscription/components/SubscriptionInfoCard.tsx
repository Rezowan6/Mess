import { InfoCard } from "@/shared/components/ui/InfoCard";
import { getSubscriptionInfo } from "../configs/subscriptionInfo.config";
import type { ISubscription } from "../types/subscription.types";

interface Props {
  subscription: ISubscription;
}

export const SubscriptionInfoCard = ({ subscription }: Props) => {
  return (
    <div className="rounded-xl border border-info p-5">
      <h3 className="mb-4 font-semibold text-accent">
        Subscription Information
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {getSubscriptionInfo(subscription).map((item) => (
          <InfoCard key={item.title} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};
