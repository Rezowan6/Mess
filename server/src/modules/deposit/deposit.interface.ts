import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ISessionScope } from "@/types/scope.interface.js";

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

export interface ICreateDepositPayload extends ISessionScope {
  memberId: number;
  createdBy: number;
  amount: number;
  paymentMethod: DepositPaymentMethodType;
  depositDate: Date;
  note?: string;
}

export interface IGetDepositByIdPayload extends ISessionScope {
  depositId: number;
}

export interface IDeleteDepositPayload extends IGetDepositByIdPayload {
  userId: number;
}

export interface IGetMemberDepositsPayload extends ISessionScope {
  memberId: number;
}

export interface IDepositSummaryPayload extends ISessionScope {
  query: IPaginationQuery;
}

// Derived from create payload, no need to repeat fields
export interface IUpdateDepositPayload extends Partial<
  Pick<ICreateDepositPayload, "amount" | "paymentMethod">
> {
  note?: string | null; // null allowed to clear the note
}
