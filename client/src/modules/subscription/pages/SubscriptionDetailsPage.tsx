import { useLocation, useParams } from "react-router-dom";

import { BackButton } from "@/shared/components/ui/BackButton";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { PlanInfoCard } from "../components/PlanInfoCard";
import { SubscriptionInfoCard } from "../components/SubscriptionInfoCard";
import { useSubscriptionById } from "../hooks/useSubscriptionById";

export const SubscriptionDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const stateSubscription = location.state;

  const { data, isPending } = useSubscriptionById(Number(id));

  const subscription = data?.data ?? stateSubscription;

  if (isPending && !subscription) {
    return <div className="p-6">Loading...</div>;
  }

  if (!subscription) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <p className="text-sm opacity-70">Subscription not found.</p>

        <BackButton />
      </div>
    );
  }

  return (
    <ManagementPage
      titleClassName="text-success"
      title={`${subscription.plan?.name ?? "Subscription"} Details`}
      description={`View details of subscription #${subscription.id}.`}
      footer={<BackButton />}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SubscriptionInfoCard subscription={subscription} />
        <PlanInfoCard subscription={subscription} />
      </div>
    </ManagementPage>
  );
};
