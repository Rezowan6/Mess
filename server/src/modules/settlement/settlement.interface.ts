export const SETTLEMENT_STATUS = [
  "PENDING",
  "PAID",
  "AWAITING_CONFIRMATION",
  "COMPLETED",
  "CANCELLED",
  "DISPUTED",
  "EXPIRED",
] as const;

export type SettlementStatus = (typeof SETTLEMENT_STATUS)[number];

export const SETTLEMENT_PAYMENT_METHOD = [
  "CASH",
  "BKASH",
  "NAGAD",
  "ROCKET",
  "BANK",
  "OTHER",
] as const;

export type SettlementPaymentMethod =
  (typeof SETTLEMENT_PAYMENT_METHOD)[number];
