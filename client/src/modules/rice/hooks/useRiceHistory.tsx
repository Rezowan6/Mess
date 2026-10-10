import { useState } from "react";

import { useRicePayments } from "@/modules/rice-payment/hooks/useRicePayments";
import type { IRicePayment } from "@/modules/rice-payment/types/ricePayment.types";
import { getPaidPercent } from "../utils/rice.utils";
import { useRiceById } from "./useRiceById";

export const useRiceHistory = (riceId: number) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<IRicePayment | null>(
    null,
  );

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

    openAdd,
    openEdit,
    closePayment,
  };
};
