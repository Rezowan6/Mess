import { useLocation, useParams } from "react-router-dom";

import { BackButton } from "@/shared/components/ui/BackButton";
import { Badge } from "@/shared/components/ui/Badge";

import { SubscriptionStatusBadge } from "../components/SubscriptionStatusBadge";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {subscription.plan?.name ?? "Subscription"}
          </h2>

          <p className="text-sm opacity-70">Subscription #{subscription.id}</p>
        </div>

        <SubscriptionStatusBadge status={subscription.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-base-300 p-5">
          <h3 className="mb-4 font-semibold">Subscription Information</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="opacity-70">Plan</span>
              <span className="font-medium">
                {subscription.plan?.name ?? "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="opacity-70">Amount</span>
              <span className="font-medium">৳{subscription.amount}</span>
            </div>

            <div className="flex justify-between">
              <span className="opacity-70">Free Trial</span>
              <Badge variant={subscription.isFreeTrial ? "success" : "neutral"}>
                {subscription.isFreeTrial ? "Yes" : "No"}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span className="opacity-70">Start Date</span>
              <span>
                {new Date(subscription.startDate).toLocaleDateString("en-GB")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="opacity-70">End Date</span>
              <span>
                {subscription.endDate
                  ? new Date(subscription.endDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-base-300 p-5">
          <h3 className="mb-4 font-semibold">Plan Information</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="opacity-70">Monthly Price</span>
              <span>৳{subscription.plan?.monthlyPrice ?? "0.00"}</span>
            </div>

            <div className="flex justify-between">
              <span className="opacity-70">Yearly Price</span>
              <span>৳{subscription.plan?.yearlyPrice ?? "0.00"}</span>
            </div>

            <div className="flex justify-between">
              <span className="opacity-70">Max Members</span>
              <span>
                {subscription.plan?.maxMembers === -1
                  ? "Unlimited"
                  : (subscription.plan?.maxMembers ?? "N/A")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <BackButton />
    </div>
  );
};
