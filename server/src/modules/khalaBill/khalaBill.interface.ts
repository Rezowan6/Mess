import { DepositPaymentMethodType } from "../deposit/deposit.interface.js";

export const KHALA_BILL_STATUS = ["pending", "partially_paid", "paid"] as const;
export const khalaBillStatus = {
  pending: "pending",
  paid: "paid",
  partially_paid: "partially_paid",
} as const;

export type KhalaillStatus = (typeof KHALA_BILL_STATUS)[number];

interface Base {
  tenantId: number;
  userId: number;
  createdBy: number;
  amount: number;
  status: KhalaillStatus;
  paymentMethod: DepositPaymentMethodType;
  month: number;
  year: number;
}

export interface ICreateKhalaBillDto extends Base {}

export interface IUpdateKhalaBillDto {
  id: number;
  tenantId: number;
  createdBy: number;
  amount?: number;
  status?: KhalaillStatus;
}

export interface IDeleteKhalaBillDto {
  id: number;
  tenantId: number;
  createdBy: number;
}
export interface IGetKhalaBills {
  tenantId: number;
  month: number;
  year: number;
}

export interface IGetBYIdKhalaBill {
  tenantId: number;
  userId: number;
  year: number;
}
