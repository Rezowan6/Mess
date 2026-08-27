import { Table } from "@/shared/components/ui/Table";

import { useSubscriptionColumns } from "../configs/subscription.columns";
import { SUBSCRIPTION_MESSAGES } from "../configs/subscription.messages";
import { useTenantSubscriptions } from "../hooks/useTenantSubscriptions";
import { SubscriptionTableSkeleton } from "./SubscriptionTableSkeleton";

export const SubscriptionTable = () => {
  const { data, isPending, isError, refetch } = useTenantSubscriptions();

  const subscriptions = data?.data ?? [];

  const columns = useSubscriptionColumns();

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
