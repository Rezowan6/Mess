import { usePlans } from "@/modules/plan/hooks/usePlans";
import { useMemo } from "react";
import { CurrentPlanCard } from "../components/CurrentPlanCard";
import { ExpiryAlert } from "../components/ExpiryAlert";
import { SubscriptionOverview } from "../components/SubscriptionOverview";
import { SubscriptionSummaryCards } from "../components/SubscriptionSummaryCards";
import { SubscriptionTimeline } from "../components/SubscriptionTimeline";
import { UpgradeButton } from "../components/UpgradeButton";
import { useCurrentSubscription } from "../hooks/useCurrentSubscription";

export const CurrentSubscriptionPage = () => {
  const { data: subscriptionData, isPending: subscriptionLoading } =
    useCurrentSubscription();

  const { data: plansData, isPending: plansLoading } = usePlans();

  const subscription = subscriptionData?.data;

  const plans = plansData?.data ?? [];

  const currentPlan = useMemo(() => {
    if (!subscription) return undefined;

    return plans.find((plan) => plan.id === subscription.planId);
  }, [plans, subscription]);

  if (subscriptionLoading || plansLoading) {
    return null;
  }

  if (!subscription || !currentPlan) {
    return (
      <div className="rounded-xl border border-base-300 p-6 text-center">
        <p className="text-sm opacity-70">No active subscription found.</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <SubscriptionOverview subscription={subscription} />

      <SubscriptionSummaryCards subscription={subscription} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CurrentPlanCard plan={currentPlan} subscription={subscription} />
        </div>

        <div className="space-y-6">
          <ExpiryAlert />

          <UpgradeButton />
        </div>
      </div>

      <SubscriptionTimeline subscription={subscription} />
    </div>
  );
};
