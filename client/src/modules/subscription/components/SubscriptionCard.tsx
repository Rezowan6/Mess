import { CalendarDays, CreditCard, Crown } from "lucide-react";

import type { ISubscription } from "../types/subscription.types";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";

interface Props {
  subscription: ISubscription;
}

export const SubscriptionCard = ({ subscription }: Props) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Crown size={20} />
            <h2 className="text-xl font-semibold">
              Plan #{subscription.planId}
            </h2>
          </div>

          <SubscriptionStatusBadge status={subscription.status} />
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold">৳{subscription.amount}</p>
          <p className="text-xs opacity-60">Subscription Amount</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="opacity-60" />

          <div>
            <p className="text-xs opacity-60">Start Date</p>
            <p className="text-sm font-medium">
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="opacity-60" />

          <div>
            <p className="text-xs opacity-60">End Date</p>
            <p className="text-sm font-medium">
              {subscription.endDate
                ? new Date(subscription.endDate).toLocaleDateString()
                : "No Expiry"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard size={18} className="opacity-60" />

          <div>
            <p className="text-xs opacity-60">Payment Type</p>
            <p className="text-sm font-medium">
              {subscription.isFreeTrial ? "Free Trial" : "Paid"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
