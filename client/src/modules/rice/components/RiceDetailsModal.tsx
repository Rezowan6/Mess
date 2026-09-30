import {
  CalendarDays,
  Pencil,
  Phone,
  Plus,
  Store,
  Trash2,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import { useDeleteRicePayment } from "@/modules/rice-payment/hooks/useDeleteRicePayment";
import { useRicePayments } from "@/modules/rice-payment/hooks/useRicePayments";
import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { AddRicePaymentModal } from "@/modules/rice-payment/components/AddRicePaymentModal";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate } from "@/shared/utils/date.utils";
import {
  RICE_PAYMENT_STATUS_VARIANT,
  RICE_PURCHASE_TYPE_VARIANT,
} from "../configs/rice.badge";
import type { IRice } from "../types/rice.types";
import {
  canAddRicePayment,
  formatTaka,
  getPaidPercent,
  RICE_PAYMENT_METHOD_LABEL,
} from "../utils/rice.utils";

interface RiceDetailsModalProps {
  rice: IRice;
  onClose: () => void;
}

export const RiceDetailsModal = ({ rice, onClose }: RiceDetailsModalProps) => {
  const { can } = useRBAC();
  const canManage = can(PERMISSIONS.EXPENSE_CREATE);
  // PAID purchases are fully paid at purchase time, so their payments are not editable
  const canEditPayments = canManage && rice.purchaseType === "CREDIT";

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<IRicePayment | null>(
    null,
  );

  const payments = useRicePayments(rice.id);
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const { mutateAsync: deletePayment } = useDeleteRicePayment();

  const paidPercent = getPaidPercent(rice);
  const paymentList = payments.data?.data ?? [];
  const hasDue = Number(rice.remainingDue) > 0;

  const handleDelete = (payment: IRicePayment) => {
    openConfirm({
      title: "Delete Payment",
      message: (
        <>
          Are you sure you want to delete the payment of{" "}
          <strong className="text-success">{formatTaka(payment.amount)}</strong>
          ? The due amount will increase.
        </>
      ),
      onConfirm: async () => {
        try {
          setLoading(true);
          await deletePayment({ riceId: rice.id, id: payment.id });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const openAdd = () => {
    setEditingPayment(null);
    setIsPaymentOpen(true);
  };

  const openEdit = (payment: IRicePayment) => {
    setEditingPayment(payment);
    setIsPaymentOpen(true);
  };

  const closePayment = () => {
    setIsPaymentOpen(false);
    setEditingPayment(null);
  };

  return (
    <>
      {/* Hidden (not unmounted) while a child modal is open, so modals never stack */}
      <Modal
        isOpen={!isPaymentOpen}
        onClose={onClose}
        title={`Rice Purchase #${rice.id}`}
      >
        <div className="space-y-5">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                size="sm"
                variant={RICE_PURCHASE_TYPE_VARIANT[rice.purchaseType]}
              >
                {rice.purchaseType}
              </Badge>
              <Badge
                size="sm"
                variant={RICE_PAYMENT_STATUS_VARIANT[rice.paymentStatus]}
              >
                {rice.paymentStatus}
              </Badge>
            </div>

            <p className="text-sm opacity-70">
              {rice.creator?.name ? `${rice.creator.name} · ` : ""}
              {Number(rice.quantity)} kg × ৳{Number(rice.unitPrice)}
            </p>
          </div>

          {/* Supplier and dates */}
          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
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
              <p className="text-lg font-bold">
                {formatTaka(rice.totalAmount)}
              </p>
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
              <ul className="divide-y divide-base-300 rounded-xl border border-base-300">
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

                    {canEditPayments && (
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
      </Modal>

      <AddRicePaymentModal
        isOpen={isPaymentOpen}
        onClose={closePayment}
        rice={rice}
        payment={editingPayment}
      />
    </>
  );
};
