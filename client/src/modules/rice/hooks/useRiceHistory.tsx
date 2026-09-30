import { useState } from "react";

import { useDeleteRicePayment } from "@/modules/rice-payment/hooks/useDeleteRicePayment";
import { useRicePayments } from "@/modules/rice-payment/hooks/useRicePayments";
import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { getPaidPercent } from "../utils/rice.utils";
import { useRiceById } from "./useRiceById";

export const useRiceHistory = (riceId: number) => {
  const { mutateAsync: deletePayment } = useDeleteRicePayment();

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<IRicePayment | null>(
    null,
  );

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const {
    data: riceResponse,
    isPending: isRicePending,
    isError: isRiceError,
    refetch: refetchRice,
  } = useRiceById(riceId);

  const rice = riceResponse?.data;

  const payments = useRicePayments(riceId);

  const paidPercent = rice ? getPaidPercent(rice) : 0;
  const paymentList = payments.data?.data ?? [];
  const hasDue = Number(rice?.remainingDue ?? 0) > 0;

  const handleDelete = (payment: IRicePayment) => {
    if (!rice) return;

    openConfirm({
      title: "Delete Payment",
      message: (
        <>
          Are you sure you want to delete the payment of{" "}
          <strong className="text-success">{payment.amount}</strong> made on{" "}
          <strong className="text-success">{payment.paymentDate}</strong>? The
          paid amount will decrease and the remaining due will increase.
        </>
      ),
      onConfirm: async () => {
        try {
          setLoading(true);

          await deletePayment({
            riceId: rice.id,
            id: payment.id,
          });
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

  return {
    rice,
    payments,
    paymentList,

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
  };
};
