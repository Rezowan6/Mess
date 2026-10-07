import { Pencil, Plus, Trash2, Wallet } from "lucide-react";

import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { Button } from "@/shared/components/ui/Button";

import { formatDate, isLocked } from "@/shared/utils/date.utils";

import {
  canAddRicePayment,
  RICE_PAYMENT_METHOD_LABEL,
} from "../../utils/rice.utils";

import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
import type { IRiceWithSummary } from "../../types/rice.types";
import { PaymentHistorySkeleton } from "../skeleton/PaymentHistorySkeleton";

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
  onDelete: (payment: IRicePayment) => void;
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
  onDelete,
}: Props) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-theme-text">
          Payment History{" "}
          <span className="font-normal text-theme-text-muted">
            ({paymentList.length})
          </span>
        </h3>

        {canManage && canAddRicePayment(rice) && (
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
        <div className="flex items-center justify-between rounded-theme-md border border-theme-danger bg-theme-danger-soft p-3 text-sm">
          <span className="text-theme-danger">Failed to load payments.</span>

          <Button variant="primary" type="button" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}

      {!isPending && !isError && paymentList.length === 0 && (
        <p className="rounded-theme-md border border-theme-border p-4 text-center text-sm text-theme-text-muted">
          No payments yet.
        </p>
      )}

      {paymentList.length > 0 && (
        <ul className="divide-y divide-theme-border">
          {paymentList.map((payment) => {
            const canEdit =
              canEditPayments &&
              canAddRicePayment(rice) &&
              !isLocked(String(payment.createdAt));

            return (
              <li key={payment.id} className="flex items-center gap-3 p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-theme-success-soft text-theme-success">
                  <Wallet size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-theme-text">
                    <AnimatedNumber
                      value={Number(payment.amount)}
                      prefix="৳ "
                      duration={1000}
                    />
                  </p>

                  <p className="text-xs text-theme-text-muted">
                    {formatDate(payment.paymentDate)} ·{" "}
                    {RICE_PAYMENT_METHOD_LABEL[payment.paymentMethod] ??
                      payment.paymentMethod}
                  </p>

                  {payment.note && (
                    <p className="truncate text-xs text-theme-text-muted">
                      {payment.note}
                    </p>
                  )}
                </div>

                {canEdit && (
                  <div className="flex items-center gap-1">
                    <Button
                      unstyled
                      type="button"
                      aria-label="Edit payment"
                      className="rounded-theme-md p-1.5 text-theme-text-muted hover:bg-theme-surface-hover hover:text-theme-text"
                      leftIcon={<Pencil size={16} />}
                      onClick={() => onEdit(payment)}
                    />

                    <Button
                      unstyled
                      type="button"
                      aria-label="Delete payment"
                      className="rounded-theme-md p-1.5 text-theme-danger hover:bg-theme-danger-soft"
                      leftIcon={<Trash2 size={16} />}
                      onClick={() => onDelete(payment)}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
