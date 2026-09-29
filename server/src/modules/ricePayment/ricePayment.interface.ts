export const RicePaymentMethod = {
  CASH: "CASH",
  BKASH: "BKASH",
  BANK: "BANK",
  OTHER: "OTHER",
} as const;

export const RICE_PAYMENT_METHODS = Object.values(RicePaymentMethod);

export type RicePaymentMethodValue =
  (typeof RicePaymentMethod)[keyof typeof RicePaymentMethod];

export interface IRicePayment {
  id: number;

  tenantId: number;
  mealSessionId: number;
  riceId: number;
  createdBy: number;

  amount: number;
  paymentMethod: RicePaymentMethodValue;
  paymentDate: Date;

  note: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateRicePaymentDto {
  tenantId: number;
  mealSessionId: number;
  riceId: number;
  createdBy: number;

  amount: number;
  paymentMethod: RicePaymentMethodValue;
  paymentDate: Date;

  note?: string | null;
}
