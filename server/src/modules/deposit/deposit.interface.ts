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

// deposit.interface.ts

export interface ICreateDepositPayload {
  tenantId: number;
  mealSessionId: number;
  memberId: number;
  createdBy: number;
  amount: number;
  paymentMethod: DepositPaymentMethodType;
  depositDate: Date;
  note?: string;
}

export interface IGetDepositByIdPayload {
  tenantId: number;
  depositId: number;
}
