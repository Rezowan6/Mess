import type { IPayment } from "../types/payment.types";

export const usePaymentSummary = (payments: IPayment[]) => {
  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "success",
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "pending",
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "failed",
  ).length;

  const totalAmount = payments
    .filter((payment) => payment.status.toLowerCase() === "success")
    .reduce((total, payment) => total + Number(payment.amount), 0);

  return {
    totalPayments,
    successfulPayments,
    pendingPayments,
    failedPayments,
    totalAmount,
    values: {
      totalPayments,
      successfulPayments,
      pendingPayments,
      failedPayments,
      totalAmount: `৳${totalAmount.toFixed(2)}`,
    },
  };
};
