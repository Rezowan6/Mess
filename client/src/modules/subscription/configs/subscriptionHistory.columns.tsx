import { ActionLink } from "@/shared/components/ui/ActionLink";
import type { TableColumn } from "@/shared/components/ui/Table";
import { ROUTES } from "@/shared/constants/routes";

import { SubscriptionStatusBadge } from "../components/SubscriptionStatusBadge";
import type { ISubscription } from "../types/subscription.types";

export const useSubscriptionHistoryColumns = (): TableColumn<ISubscription>[] => {
  const columns: TableColumn<ISubscription>[] = [
    {
      key: "plan",
      title: "Plan",
      render: (subscription) => subscription.plan?.name ?? "N/A",
    },

    {
      key: "amount",
      title: "Amount",
      render: (subscription) => `৳${subscription.amount}`,
    },

    {
      key: "status",
      title: "Status",
      render: (subscription) => (
        <SubscriptionStatusBadge status={subscription.status} />
      ),
    },

    {
      key: "startDate",
      title: "Start Date",
      render: (subscription) =>
        new Date(subscription.startDate).toLocaleDateString("en-GB"),
    },

    {
      key: "endDate",
      title: "End Date",
      render: (subscription) =>
        subscription.endDate
          ? new Date(subscription.endDate).toLocaleDateString("en-GB")
          : "N/A",
    },

    {
      key: "action",
      title: "Action",
      render: (subscription) => (
        <ActionLink
          to={`${ROUTES.SUBSCRIPTION}/${subscription.id}`}
          state={subscription}
        >
          Details
        </ActionLink>
      ),
    },
  ];

  return columns;
};
