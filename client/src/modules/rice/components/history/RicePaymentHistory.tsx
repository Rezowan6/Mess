import { Plus } from "lucide-react";

import { EmptyState } from "@/shared/components/feedback/EmptyState"; // adjust path
import { ErrorState } from "@/shared/components/feedback/ErrorState"; // adjust path
import { Button } from "@/shared/components/ui/Button";

import { canAddRicePayment } from "../../utils/rice.utils";

import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
import type { IRiceWithSummary } from "../../types/rice.types";
import { PaymentHistorySkeleton } from "../skeleton/PaymentHistorySkeleton";
import { RicePaymentHistoryItem } from "./RicePaymentHistoryItem";

interface Props {
  rice: IRiceWithSummary;

  paymentList: IRicePayment[];

  isPending: boolean;
  isError: boolean;

  canManage: boolean;
  canEditPayments: boolean;

  onRetry: () => void;
  onAdd: () => void;
  onEdit: (payment: IRicePayment) => void;
}

export const RicePaymentHistory = ({
  rice,
  paymentList,
  isPending,
  isError,
  canManage,
  canEditPayments,
  onRetry,
  onAdd,
  onEdit,
}: Props) => {
  const canAddPayment = canManage && canAddRicePayment(rice);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-theme-text">
          Payment History{" "}
          <span className="font-normal text-theme-text-muted">
            ({paymentList.length})
          </span>
        </h3>

        {canAddPayment && (
          <Button
            variant="pay"
            type="button"
            onClick={onAdd}
            leftIcon={<Plus size={16} />}
          >
            Add Payment
          </Button>
        )}
      </div>

      {isPending && <PaymentHistorySkeleton rows={4} />}

      {isError && (
        <ErrorState
          title="Failed to load payments"
          description="We couldn't load the payment history. Please try again."
          onRetry={onRetry}
        />
      )}

      {!isPending && !isError && paymentList.length === 0 && (
        <EmptyState
          title="No payments yet"
          description="Payments added for this rice purchase will appear here."
          action={
            canAddPayment ? (
              <Button
                variant="pay"
                type="button"
                onClick={onAdd}
                leftIcon={<Plus size={16} />}
              >
                Add Payment
              </Button>
            ) : undefined
          }
        />
      )}

      {paymentList.length > 0 && (
        <ul className="divide-y divide-theme-border">
          {paymentList.map((payment) => (
            <RicePaymentHistoryItem
              key={payment.id}
              rice={rice}
              payment={payment}
              canManage={canManage}
              canEditPayments={canEditPayments}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
