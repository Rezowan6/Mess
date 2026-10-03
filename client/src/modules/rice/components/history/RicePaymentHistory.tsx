import { Pencil, Plus, Trash2, Wallet } from "lucide-react";

import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { Button } from "@/shared/components/ui/Button";

import { formatDate, isLocked } from "@/shared/utils/date.utils";

import {
  canAddRicePayment,
  RICE_PAYMENT_METHOD_LABEL,
} from "../../utils/rice.utils";

import type { IRiceWithSummary } from "../../types/rice.types";
import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
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
        <h3 className="font-semibold">
          Payment History{" "}
          <span className="font-normal opacity-60">({paymentList.length})</span>
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
        <div className="flex items-center justify-between rounded-xl border border-error/40 p-3 text-sm">
          <span className="text-error">Failed to load payments.</span>

          <Button variant="primary" type="button" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}

      {!isPending && !isError && paymentList.length === 0 && (
        <p className="rounded-xl border border-base-300 p-4 text-center text-sm opacity-60">
          No payments yet.
        </p>
      )}

      {paymentList.length > 0 && (
        <ul className="divide-y divide-info/10">
          {paymentList.map((payment) => {
            const canEdit =
              canEditPayments &&
              canAddRicePayment(rice) &&
              !isLocked(String(payment.createdAt));

            return (
              <li key={payment.id} className="flex items-center gap-3 p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <Wallet size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold">
                    <AnimatedNumber
                      value={Number(payment.amount)}
                      prefix="৳ "
                      duration={1000}
                    />
                  </p>

                  <p className="text-xs opacity-60">
                    {formatDate(payment.paymentDate)} ·{" "}
                    {RICE_PAYMENT_METHOD_LABEL[payment.paymentMethod] ??
                      payment.paymentMethod}
                  </p>

                  {payment.note && (
                    <p className="truncate text-xs opacity-60">
                      {payment.note}
                    </p>
                  )}
                </div>

                {canEdit && (
                  <div className="flex items-center gap-1">
                    <Button
                      unstyled
                      leftIcon={<Pencil size={16} />}
                      onClick={() => onEdit(payment)}
                    />

                    <Button
                      unstyled
                      leftIcon={<Trash2 size={16} className="text-error" />}
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
