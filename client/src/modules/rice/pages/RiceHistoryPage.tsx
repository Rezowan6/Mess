import { useParams } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { AddRicePaymentModal } from "@/modules/rice-payment/components/AddRicePaymentModal";

import { RiceHistoryHeader } from "../components/history/RiceHistoryHeader";
import { RicePaymentHistory } from "../components/history/RicePaymentHistory";
import { RicePaymentProgress } from "../components/history/RicePaymentProgress";
import { RicePaymentSummary } from "../components/history/RicePaymentSummary";
import { RicePurchaseInfo } from "../components/history/RicePurchaseInfo";
import { useRiceHistory } from "../hooks/useRiceHistory";

export const RiceHistoryPage = () => {
  const { riceId } = useParams<{ riceId: string }>();
  const id = Number(riceId);

  const { can } = useRBAC();

  const canManage = can(PERMISSIONS.EXPENSE_CREATE);

  const {
    rice,
    paymentList,
    payments,
    isRicePending,
    isRiceError,
    refetchRice,
    paidPercent,
    hasDue,
    isPaymentOpen,
    editingPayment,
    handleDelete,
    openAdd,
    openEdit,
    closePayment,
  } = useRiceHistory(id);

  const canEditPayments = canManage && rice?.purchaseType === "CREDIT";

  if (Number.isNaN(id)) {
    return <p className="text-error">Invalid rice purchase.</p>;
  }

  if (isRicePending) {
    return <p className="text-sm opacity-60">Loading rice purchase...</p>;
  }

  if (isRiceError || !rice) {
    return (
      <div className="space-y-3">
        <p className="text-error">Failed to load rice purchase.</p>

        <Button type="button" variant="primary" onClick={() => refetchRice()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        <RiceHistoryHeader rice={rice} />

        <RicePurchaseInfo rice={rice} hasDue={hasDue} />

        <RicePaymentSummary rice={rice} hasDue={hasDue} />

        <RicePaymentProgress paidPercent={paidPercent} />

        <RicePaymentHistory
          rice={rice}
          paymentList={paymentList}
          isPending={payments.isPending}
          isError={payments.isError}
          canManage={canManage}
          canEditPayments={canEditPayments}
          onRetry={() => payments.refetch()}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddRicePaymentModal
        isOpen={isPaymentOpen}
        onClose={closePayment}
        rice={rice}
        payment={editingPayment}
      />
    </>
  );
};
