import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { ActionLink } from "@/shared/components/ui/ActionLink";
import { ROUTES } from "@/shared/constants/routes";

import { PaymentSummaryCards } from "../components/PaymentSummaryCards";
import { RecentPaymentTable } from "../components/RecentPaymentTable";
import { usePayments } from "../hooks/usePayments";

export const PaymentPage = () => {
  const { data, isPending, isError, refetch } = usePayments();

  const payments = data?.data ?? [];

  return (
    <ManagementPage
      title="Payments"
      description="View and manage your tenant payment transactions."
      footer={
        <ActionLink to={`${ROUTES.PAYMENT}/history`}>
          Payment History
        </ActionLink>
      }
    >
      <div className="space-y-6">
        <PaymentSummaryCards payments={payments} />

        <RecentPaymentTable
          payments={payments}
          loading={isPending}
          error={isError}
          refetch={refetch}
        />
      </div>
    </ManagementPage>
  );
};