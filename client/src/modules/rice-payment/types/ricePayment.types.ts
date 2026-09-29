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
  paymentDate: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateRicePayment {
  riceId: number;
  amount: number;
  paymentMethod: RicePaymentMethodValue;
  paymentDate?: string;
  note?: string | null;
}

export interface IUpdateRicePayment {
  amount?: number;
  paymentMethod?: RicePaymentMethodValue;
  paymentDate?: string;
  note?: string | null;
}
