import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Table } from "@/shared/components/ui/Table";

import { paymentColumns } from "../configs/payment.columns";
import { usePayments } from "../hooks/usePayments";

export const PaymentPage = () => {
  const { data, isPending, isError, refetch } = usePayments();

  const payments = data?.data ?? [];

  console.log(payments)

  return (
    <ManagementPage
      title="Payments"
      description="View and manage your tenant payment transactions."
    >
      <Table
        columns={paymentColumns}
        data={payments}
        loading={isPending}
        error={isError}
        refetch={refetch}
      />
    </ManagementPage>
  );
};
