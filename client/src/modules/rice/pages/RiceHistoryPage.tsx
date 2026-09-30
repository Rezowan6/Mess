import { useParams } from "react-router-dom";

import { Table } from "@/shared/components/ui/Table";

import { RICE_MESSAGES } from "@/modules/rice/configs/rice.message";
import { useRiceRemainingDue } from "@/modules/rice/hooks/useRiceRemainingDue";
import { formatTaka } from "@/modules/rice/utils/rice.utils";
import { useRicePaymentColumns } from "@/modules/rice-payment/configs/ricePayment.columns";
import { useRicePayments } from "@/modules/rice-payment/hooks/useRicePayments";
import { useRicePaymentTotalPaid } from "@/modules/rice-payment/hooks/useRicePaymentTotalPaid";

export const RiceHistoryPage = () => {
  const { riceId } = useParams<{ riceId: string }>();
  const id = Number(riceId);

  const columns = useRicePaymentColumns();

  const payments = useRicePayments(id);
  const totalPaid = useRicePaymentTotalPaid(id);
  const remainingDue = useRiceRemainingDue(id);

  if (Number.isNaN(id)) {
    return <p className="text-error">Invalid rice purchase.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="stats w-full shadow">
        <div className="stat">
          <div className="stat-title">Total paid</div>
          <div className="stat-value text-success text-2xl">
            {formatTaka(totalPaid.data?.data ?? 0)}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Remaining due</div>
          <div className="stat-value text-error text-2xl">
            {formatTaka(remainingDue.data?.data ?? 0)}
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={payments.data?.data ?? []}
        loading={payments.isPending}
        error={payments.isError}
        message={RICE_MESSAGES}
        refetch={payments.refetch}
      />
    </div>
  );
};
