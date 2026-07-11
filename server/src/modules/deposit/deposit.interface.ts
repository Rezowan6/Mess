export const DepositPaymentMethod = {
  CASH: "cash",
  BKASH: "bkash",
  NAGAD: "nagad",
  ROCKET: "rocket",
  BANK: "bank",
} as const;

export const DEPOSIT_PAYMENT_METHOD = Object.values(DepositPaymentMethod);

export type DepositPaymentMethodType =
  (typeof DepositPaymentMethod)[keyof typeof DepositPaymentMethod];
