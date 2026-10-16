import { Optional } from "sequelize";

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

export interface ICreateSettlementInput {
  tenantId: number;
  mealSessionId: number;
  memberId: number;
  payerId: number;
  payeeId: number;
  amount: number;
  currency?: string;
  status?: SettlementStatus;
  paymentMethodId?: number | null;
  paymentMethod: SettlementPaymentMethod;
  paymentProviderSnapshot?: string | null;
  accountLast4?: string | null;
  transactionReference?: string | null;
  idempotencyKey?: string | null;
  note?: string | null;
  calculationSnapshot: Record<string, unknown>;
  balanceBefore?: number | null;
  balanceAfter?: number | null;
  initiatedBy: number;
  initiatedAt?: Date | null;
  paidAt?: Date | null;
  cancelledBy?: number | null;
  cancelledAt?: Date | null;
  cancelReason?: string | null;
  disputedBy?: number | null;
  disputedAt?: Date | null;
  disputeReason?: string | null;
  resolvedBy?: number | null;
  resolvedAt?: Date | null;
  resolutionNote?: string | null;
}

export type IUpdateSettlementInput = Partial<
  Omit<
    ICreateSettlementInput,
    | "tenantId"
    | "mealSessionId"
    | "memberId"
    | "payerId"
    | "payeeId"
    | "initiatedBy"
    | "idempotencyKey"
  >
>;

export type ICreateSettlementAttributes = Optional<
  ICreateSettlementInput,
  | "currency"
  | "status"
  | "paymentMethodId"
  | "paymentProviderSnapshot"
  | "accountLast4"
  | "transactionReference"
  | "idempotencyKey"
  | "note"
  | "balanceBefore"
  | "balanceAfter"
  | "initiatedAt"
  | "paidAt"
  | "cancelledBy"
  | "cancelledAt"
  | "cancelReason"
  | "disputedBy"
  | "disputedAt"
  | "disputeReason"
  | "resolvedBy"
  | "resolvedAt"
  | "resolutionNote"
>;
