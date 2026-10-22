import type { DepositPaymentMethodType } from "../deposit/deposit.interface.js";
export const CURRENT_BILL_STATUS = [
  "pending",
  "partially_paid",
  "paid",
] as const;

export type CurrentBillStatus = (typeof CURRENT_BILL_STATUS)[number];

export interface ICreateCurrentBillDto {
  tenantId: number;
  userId: number;
  createdBy: number;
  amount: number;
  paymentMethod: DepositPaymentMethodType;
  month: number;
  year: number;
  status?: CurrentBillStatus;
}

export interface IUpdateCurrentBillDto {
  id: number;
  tenantId: number;
  createdBy: number;
  amount?: number;
  paymentMethod?: DepositPaymentMethodType;
  status?: CurrentBillStatus;
}

export interface IDeleteCurrentBillDto {
  id: number;
  tenantId: number;
  createdBy: number;
}

export interface IGetCurrentBills {
  tenantId: number;
  month: number;
  year: number;
}

export interface IGetBYIdCurrentBill {
  tenantId: number;
  userId: number;
  year: number;
}
