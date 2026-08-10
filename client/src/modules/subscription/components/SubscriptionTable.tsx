import { useState } from "react";

import { Table } from "@/shared/components/ui/Table";

import { useSubscriptionColumns } from "../configs/subscription.columns";
import { SUBSCRIPTION_MESSAGES } from "../configs/subscription.messages";
import { useTenantSubscriptions } from "../hooks/useTenantSubscriptions";
import type { ISubscription } from "../types/subscription.types";
import { SubscriptionTableSkeleton } from "./SubscriptionTableSkeleton";

export const SubscriptionTable = () => {
  const [selectedSubscription, setSelectedSubscription] =
    useState<ISubscription | null>(null);

  const { data, isPending, isError, refetch } = useTenantSubscriptions();

  const subscriptions = data?.data ?? [];

  const handleView = (subscription: ISubscription) => {
    setSelectedSubscription(subscription);
  };

  const columns = useSubscriptionColumns(handleView);

  if (isPending) {
    return <SubscriptionTableSkeleton />;
  }

  return (
    <Table
      columns={columns}
      data={subscriptions}
      loading={isPending}
      error={isError}
      message={SUBSCRIPTION_MESSAGES}
      refetch={refetch}
    />
  );
};
