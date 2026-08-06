import { plans } from "@/modules/landing/configs/plans.config";
import { CurrentPlanCard } from "../components/CurrentPlanCard";
import { ExpiryAlert } from "../components/ExpiryAlert";
import { SubscriptionOverview } from "../components/SubscriptionOverview";
import { SubscriptionSummaryCards } from "../components/SubscriptionSummaryCards";
import { SubscriptionTimeline } from "../components/SubscriptionTimeline";
import { UpgradeButton } from "../components/UpgradeButton";

export const CurrentSubscriptionPage = () => {
  const currentSubscriptionPlan = plans.find((plan) => plan.isActive);

  if (!currentSubscriptionPlan) {
    return null;
  }
  return (
    <div className="space-y-6">
      <SubscriptionOverview />

      <SubscriptionSummaryCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CurrentPlanCard plan={currentSubscriptionPlan} />
        </div>

        <div className="space-y-6">
          <ExpiryAlert />

          <UpgradeButton />
        </div>
      </div>

      <SubscriptionTimeline />
    </div>
  );
};
