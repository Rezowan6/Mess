import type { TableColumn } from "@/shared/components/ui/Table";

import { SubscriptionRowActions } from "../components/SubscriptionRowActions";
import { SubscriptionStatusBadge } from "../components/SubscriptionStatusBadge";
import type { ISubscription } from "../types/subscription.types";

export const useSubscriptionColumns = (
): TableColumn<ISubscription>[] => {
  return [
    {
      key: "plan",
      title: "Plan",
      render: (subscription) => subscription.planId,
    },
    {
      key: "status",
      title: "Status",
      render: (subscription) => (
        <SubscriptionStatusBadge status={subscription.status} />
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (subscription) => `৳${subscription.amount}`,
    },
    {
      key: "startDate",
      title: "Start Date",
      render: (subscription) =>
        new Date(subscription.startDate).toLocaleDateString(),
    },
    {
      key: "endDate",
      title: "End Date",
      hideOnMobile: true,
      render: (subscription) =>
        subscription.endDate
          ? new Date(subscription.endDate).toLocaleDateString()
          : "Unlimited",
    },
    {
      key: "actions",
      title: "Actions",
      className: "w-24",
      render: (subscription) => (
        <SubscriptionRowActions subscription={subscription} />
      ),
    },
  ];
};
