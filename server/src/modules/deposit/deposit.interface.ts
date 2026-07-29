import { IPaginationQuery } from "@/common/types/pagination.interface.js";

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
  mealSessionId: number;
  depositId: number;
}

export interface IUpdateDepositPayload {
  amount?: number;
  paymentMethod?: DepositPaymentMethodType;
  note?: string | null;
}
export interface IDeleteDepositPayload {
  tenantId: number;
  mealSessionId: number;
  depositId: number;
}
export interface IGetMemberDepositsPayload {
  tenantId: number;
  memberId: number;
  mealSessionId: number;
}
export interface IDepositSummaryPayload {
  tenantId: number;
  mealSessionId: number;
  query: IPaginationQuery
}
