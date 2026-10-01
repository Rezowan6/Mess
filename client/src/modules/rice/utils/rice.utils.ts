import type { IRice } from "../types/rice.types";



/**
 * Payment is allowed only for CREDIT purchases that still have due amount.
 * PAID purchases are fully paid at purchase time.
 */
export const canAddRicePayment = (
  rice: Pick<IRice, "purchaseType" | "remainingDue">,
): boolean => rice.purchaseType === "CREDIT" && Number(rice.remainingDue) > 0;


export const getPaidPercent = (
  rice: Pick<IRice, "totalAmount" | "totalPaid">,
): number => {
  const total = Number(rice.totalAmount);
  if (total <= 0) return 0;

  return Math.min(100, Math.round((Number(rice.totalPaid) / total) * 100));
};

// unnessary
export const RICE_PAYMENT_METHOD_LABEL: Record<string, string> = {
  CASH: "Cash",
  BKASH: "bKash",
  BANK: "Bank",
  OTHER: "Other",
};

