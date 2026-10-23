export const SETTLEMENT_STATUSES = [
  "PENDING",
  "PAID",
  "CANCELLED",
  "DISPUTED",
  "RESOLVED",
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
  calculationSnapshot?: Record<string, unknown>;
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

type SettlementMutableFields = Pick<
  ISettlement,
  | "amount"
  | "currency"
  | "paymentMethodId"
  | "paymentMethod"
  | "paymentProviderSnapshot"
  | "accountLast4"
  | "transactionReference"
  | "note"
  | "calculationSnapshot"
  | "balanceBefore"
  | "balanceAfter"
>;

export type ICreateSettlementDto = Pick<
  ISettlement,
  "memberId" | "payerId" | "payeeId"
> &
  Pick<
    SettlementMutableFields,
    "amount" | "paymentMethod" | "calculationSnapshot"
  > &
  Partial<
    Pick<
      SettlementMutableFields,
      | "currency"
      | "paymentMethodId"
      | "paymentProviderSnapshot"
      | "accountLast4"
      | "transactionReference"
      | "note"
      | "balanceBefore"
      | "balanceAfter"
    >
  > & {
    idempotencyKey?: string | null;
  };

export type IUpdateSettlementDto = Partial<SettlementMutableFields> & {
  status?: SettlementStatus;
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
};
