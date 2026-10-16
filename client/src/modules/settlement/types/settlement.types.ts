export const SETTLEMENT_STATUSES = [
  "PENDING",
  "PAID",
  "AWAITING_CONFIRMATION",
  "COMPLETED",
  "CANCELLED",
  "DISPUTED",
  "EXPIRED",
] as const;

export type SettlementStatus = (typeof SETTLEMENT_STATUSES)[number];

export const SETTLEMENT_PAYMENT_METHODS = [
  "CASH",
  "BKASH",
  "NAGAD",
  "ROCKET",
  "BANK",
  "OTHER",
] as const;

export type SettlementPaymentMethod =
  (typeof SETTLEMENT_PAYMENT_METHODS)[number];

export interface ISettlement {
  id: number;
  tenantId: number;
  mealSessionId: number;
  memberId: number;
  payerId: number;
  payeeId: number;
  amount: number;
  currency: string;
  status: SettlementStatus;
  paymentMethodId: number | null;
  paymentMethod: SettlementPaymentMethod;
  paymentProviderSnapshot: string | null;
  accountLast4: string | null;
  transactionReference: string | null;
  idempotencyKey: string | null;
  note: string | null;
  calculationSnapshot: Record<string, unknown>;
  balanceBefore: number | null;
  balanceAfter: number | null;
  initiatedBy: number;
  initiatedAt: string | null;
  paidAt: string | null;
  cancelledBy: number | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  disputedBy: number | null;
  disputedAt: string | null;
  disputeReason: string | null;
  resolvedBy: number | null;
  resolvedAt: string | null;
  resolutionNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSettlementDto {
  memberId: number;
  payerId: number;
  payeeId: number;
  amount: number;
  currency?: string;
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
}

export interface IUpdateSettlementDto {
  amount?: number;
  currency?: string;
  status?: SettlementStatus;
  paymentMethodId?: number | null;
  paymentMethod?: SettlementPaymentMethod;
  paymentProviderSnapshot?: string | null;
  accountLast4?: string | null;
  transactionReference?: string | null;
  note?: string | null;
  calculationSnapshot?: Record<string, unknown>;
  balanceBefore?: number | null;
  balanceAfter?: number | null;
  paidAt?: string | null;
  cancelledBy?: number | null;
  cancelledAt?: string | null;
  cancelReason?: string | null;
  disputedBy?: number | null;
  disputedAt?: string | null;
  disputeReason?: string | null;
  resolvedBy?: number | null;
  resolvedAt?: string | null;
  resolutionNote?: string | null;
}
