import { Table } from "@/shared/components/ui/Table";

import { paymentColumns } from "../configs/payment.columns";
import { usePayments } from "../hooks/usePayments";

export const PaymentHistoryTable = () => {
  const { data, isPending, isError, refetch } = usePayments();

  const payments = data?.data ?? [];

  return (
    <Table
      columns={paymentColumns}
      data={payments}
      loading={isPending}
      error={isError}
      refetch={refetch}
    />
  );
};
