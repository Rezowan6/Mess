import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Table } from "@/shared/components/ui/Table";

import { BackButton } from "@/shared/components/ui/BackButton";
import { useSubscriptionHistoryColumns } from "../configs/subscriptionHistory.columns";
import { useTenantSubscriptions } from "../hooks/useTenantSubscriptions";

export const SubscriptionHistoryPage = () => {
  const { data, isPending, isError, refetch } = useTenantSubscriptions();

  const subscriptions = data?.data ?? [];

  const columns = useSubscriptionHistoryColumns();

  return (
    <ManagementPage
      title="Subscription History"
      description="View your tenant's previous and current subscription history."
      footer={<BackButton />}
    >
      <Table
        columns={columns}
        data={subscriptions}
        loading={isPending}
        error={isError}
        refetch={refetch}
      />
    </ManagementPage>
  );
};
