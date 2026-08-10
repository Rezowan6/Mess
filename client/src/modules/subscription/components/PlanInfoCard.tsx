import { InfoCard } from "@/shared/components/ui/InfoCard";
import { getPlanInfo } from "../configs/planInfo.config";
import type { ISubscription } from "../types/subscription.types";

interface Props {
  subscription: ISubscription;
}

export const PlanInfoCard = ({ subscription }: Props) => {
  return (
    <div className="rounded-xl border border-info p-5">
      <h3 className="mb-4 font-semibold text-accent">Plan Information</h3>

      <div className="grid grid-cols-2 gap-4">
        {getPlanInfo(subscription).map((item) => (
          <InfoCard key={item.title} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};
