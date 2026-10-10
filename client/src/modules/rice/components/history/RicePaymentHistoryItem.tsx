import { Wallet } from "lucide-react";

import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { formatDate, isLocked } from "@/shared/utils/date.utils";

import {
  canAddRicePayment,
  RICE_PAYMENT_METHOD_LABEL,
} from "../../utils/rice.utils";

import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
import type { IRiceWithSummary } from "../../types/rice.types";
import { RicePaymentHistoryAction } from "./RicePaymentHistoryAction";

interface Props {
  rice: IRiceWithSummary;
  payment: IRicePayment;
  canManage: boolean;
  canEditPayments: boolean;
  onEdit: (payment: IRicePayment) => void;
}

export const RicePaymentHistoryItem = ({
  rice,
  payment,
  canManage,
  canEditPayments,
  onEdit,
}: Props) => {
  const canEdit =
    canManage &&
    canEditPayments &&
    canAddRicePayment(rice) &&
    !isLocked(String(payment.createdAt));

  return (
    <li className="flex items-center gap-3 p-3">
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
        <RicePaymentHistoryAction
          riceId={payment.riceId}
          payment={payment}
          onEdit={onEdit}
        />
      )}
    </li>
  );
};
