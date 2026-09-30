import {
  CalendarDays,
  Pencil,
  Phone,
  Plus,
  Store,
  Trash2,
  Wallet,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";

import { AddRicePaymentModal } from "@/modules/rice-payment/components/AddRicePaymentModal";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import {
  RICE_PAYMENT_STATUS_VARIANT,
  RICE_PURCHASE_TYPE_VARIANT,
} from "../configs/rice.badge";

import {
  canAddRicePayment,
  formatTaka,
  RICE_PAYMENT_METHOD_LABEL,
  toTitleCase,
} from "../utils/rice.utils";

import { formatDate } from "@/shared/utils/date.utils";
import { useParams } from "react-router-dom";
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
      {/* Hidden (not unmounted) while a child modal is open, so modals never stack */}

      <div className="space-y-5">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-60">Purchase Type</span>
              <Badge
                size="sm"
                variant={RICE_PURCHASE_TYPE_VARIANT[rice.purchaseType]}
              >
                {toTitleCase(rice.purchaseType)}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs opacity-60">Payment Status</span>
              <Badge
                size="sm"
                variant={RICE_PAYMENT_STATUS_VARIANT[rice.paymentStatus]}
              >
                {toTitleCase(rice.paymentStatus)}
              </Badge>
            </div>
          </div>

          <p className="text-sm opacity-70">
            {rice.creator?.name ? `${rice.creator.name} · ` : ""}
            {Number(rice.quantity)} kg × ৳{Number(rice.unitPrice)}
          </p>
        </div>

        {/* Supplier and dates */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Store size={16} className="opacity-60" />
            <span>{rice.supplierName ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="opacity-60" />
            <span>{rice.supplierPhone ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="opacity-60" />
            <span>Bought: {formatDate(rice.purchaseDate)}</span>
          </div>
          {rice.dueDate && (
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="opacity-60" />
              <span>
                Due by:{" "}
                <span className={hasDue ? "text-error" : ""}>
                  {formatDate(rice.dueDate)}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3">
            <p className="text-xs opacity-60">Total</p>
            <p className="text-lg font-bold">{formatTaka(rice.totalAmount)}</p>
          </div>
          <div className="p-3">
            <p className="text-xs opacity-60">Paid</p>
            <p className="text-lg font-bold text-success">
              {formatTaka(rice.totalPaid)}
            </p>
          </div>
          <div className="p-3">
            <p className="text-xs opacity-60">Remaining</p>
            <p className={`text-lg font-bold ${hasDue ? "text-error" : ""}`}>
              {formatTaka(rice.remainingDue)}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <progress
            className="progress progress-success w-full"
            value={paidPercent}
            max={100}
          />
          <p className="text-xs opacity-60">{paidPercent}% paid</p>
        </div>

        {/* Payment history */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Payment History{" "}
              <span className="font-normal opacity-60">
                ({paymentList.length})
              </span>
            </h3>

            {canManage && canAddRicePayment(rice) && (
              <Button
                variant="secondary"
                type="button"
                onClick={openAdd}
                leftIcon={<Plus size={16} />}
              >
                Add Payment
              </Button>
            )}
          </div>

          {payments.isPending && (
            <p className="text-sm opacity-60">Loading payments...</p>
          )}

          {payments.isError && (
            <div className="flex items-center justify-between rounded-xl border border-error/40 p-3 text-sm">
              <span className="text-error">Failed to load payments.</span>
              <Button
                variant="primary"
                type="button"
                onClick={() => payments.refetch()}
              >
                Retry
              </Button>
            </div>
          )}

          {!payments.isPending &&
            !payments.isError &&
            paymentList.length === 0 && (
              <p className="rounded-xl border border-base-300 p-4 text-center text-sm opacity-60">
                No payments yet.
              </p>
            )}

          {paymentList.length > 0 && (
            <ul className="divide-y divide-info/10">
              {paymentList.map((payment) => (
                <li key={payment.id} className="flex items-center gap-3 p-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-success/10 text-success">
                    <Wallet size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">
                      {formatTaka(payment.amount)}
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

                  {canEditPayments && canAddRicePayment(rice) && (
                    <div className="flex items-center gap-1">
                      <Button
                        unstyled
                        leftIcon={<Pencil size={16} />}
                        onClick={() => openEdit(payment)}
                      />
                      <Button
                        unstyled
                        leftIcon={<Trash2 size={16} className="text-error" />}
                        onClick={() => handleDelete(payment)}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
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
