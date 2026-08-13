import { usePlans } from "@/modules/plan/hooks/usePlans";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { useMemo } from "react";
import { CurrentPlanCard } from "../components/CurrentPlanCard";
import { ExpiryAlert } from "../components/ExpiryAlert";
import { SubscriptionOverview } from "../components/SubscriptionOverview";
import { SubscriptionSkeleton } from "../components/SubscriptionSkeleton";
import { SubscriptionSummaryCards } from "../components/SubscriptionSummaryCards";
import { SubscriptionTimeline } from "../components/SubscriptionTimeline";
import { UpgradeButton } from "../components/UpgradeButton";
import { SUBSCRIPTION_MESSAGES } from "../configs/subscription.messages";
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
    return <SubscriptionSkeleton />;
  }

  if (!subscription || !currentPlan) {
    const { empty } = SUBSCRIPTION_MESSAGES;
    return <EmptyState title={empty.title} description={empty.description} />;
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
