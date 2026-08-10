import type { ISubscription } from "@/modules/subscription/types/subscription.types";

export type PaymentGatewayType = "bkash" | "stripe";

export type PaymentStatusType =
  "pending" | "paid" | "failed" | "cancelled" | "refunded";

export interface IPayment {
  id: number;
  tenantId: number;
  subscriptionId: number;
  transactionId: string | null;
  gatewayPaymentId: string | null;
  gateway: PaymentGatewayType;
  amount: string;
  status: PaymentStatusType;
  paidAt: string | null;
  gatewayResponse: unknown | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;

  subscription?: ISubscription;
}
