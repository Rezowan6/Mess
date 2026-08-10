import { Table } from "@/shared/components/ui/Table";

import { paymentColumns } from "../configs/payment.columns";
import type { IPayment } from "../types/payment.types";

interface Props {
  payments: IPayment[];
  loading?: boolean;
  error?: boolean;
  refetch?: () => void;
}

export const RecentPaymentTable = ({
  payments,
  loading,
  error,
  refetch,
}: Props) => {
  const recentPayments = [...payments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-base-300 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Recent Payments</h2>

        <p className="text-sm text-base-content/60">
          Your latest payment transactions.
        </p>
      </div>

      <Table
        columns={paymentColumns}
        data={recentPayments}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};
