import { useLocation, useParams } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { BackButton } from "@/shared/components/ui/BackButton";
import { Badge } from "@/shared/components/ui/Badge";
import { InfoCard } from "@/shared/components/ui/InfoCard";

import { PaymentStatusBadge } from "../components/PaymentStatusBadge";
import { usePayment } from "../hooks/usePayment";
import type { IPayment } from "../types/payment.types";
import { formatDate } from "@/shared/utils/date.utils";

export const PaymentDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const statePayment = location.state as IPayment | undefined;

  const { data, isPending, isError, refetch } = usePayment(Number(id));

  const payment = data?.data ?? statePayment;

  if (isPending && !payment) {
    return (
      <ManagementPage
        title="Payment Details"
        description="View payment transaction details."
      >
        <div>Loading...</div>
      </ManagementPage>
    );
  }

  if (isError || !payment) {
    return (
      <ManagementPage
        title="Payment Details"
        description="View payment transaction details."
      >
        <div className="space-y-4">
          <p className="text-error">Payment not found.</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </ManagementPage>
    );
  }

  return (
    <ManagementPage
      title="Payment Details"
      description={`Payment #${payment.id} transaction information.`}
      action={
        payment.status.toLowerCase() === "success" && (
          <Badge variant="success">Payment completed successfully</Badge>
        )
      }
      footer={<BackButton />}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {payment.transactionId ?? "Payment"}
            </h2>

            <p className="text-sm opacity-70">
              {payment.gateway.toUpperCase()} Payment
            </p>
          </div>

          <PaymentStatusBadge status={payment.status} />
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          <InfoCard title="Amount" value={`৳${payment.amount}`} />

          <InfoCard title="Gateway" value={payment.gateway.toUpperCase()} />

          <InfoCard
            title="Transaction ID"
            value={payment.transactionId ?? "N/A"}
          />

          <InfoCard
            title="Gateway Payment ID"
            value={payment.gatewayPaymentId ?? "N/A"}
          />

          <InfoCard
            title="Paid At"
            value={
              payment.paidAt
                ? formatDate(payment.paidAt)
                : "N/A"
            }
          />

          <InfoCard
            title="Failure Reason"
            value={payment.failureReason ?? "N/A"}
          />

          <InfoCard title="Subscription ID" value={payment.subscriptionId} />

          <InfoCard
            title="Created At"
            value={formatDate(payment.createdAt)}
          />
        </div>
      </div>
    </ManagementPage>
  );
};
