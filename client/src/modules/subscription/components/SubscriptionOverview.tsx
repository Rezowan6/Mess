import { IconBox } from "@/shared/components/ui/IconBox";
import { Crown } from "lucide-react";
import type { ISubscription } from "../types/subscription.types";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";

interface Props {
  subscription: ISubscription;
}

export const SubscriptionOverview = ({ subscription }: Props) => {

  return (
    <div className="rounded-2xl bg-success/20 p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <IconBox
            icon={<Crown size={28} />}
            bgClassName="bg-warning/10"
            textClassName="text-warning"
          />

          <div>
            <h2 className="text-2xl font-bold">Subscription & Billing</h2>

            <p className="mt-1 text-sm text-base-content/70">
              View your current subscription, billing status, payment history,
              and manage your plan.
            </p>
          </div>
        </div>
        <SubscriptionStatusBadge status={subscription.status} />
      </div>
    </div>
  );
};
