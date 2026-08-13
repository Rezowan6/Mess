import type { ISubscription } from "@/modules/subscription/types/subscription.types";

export const PaymentGateway = {
  FAKE: "FAKE",
  BKASH: "BKASH",
  NAGAD: "NAGAD",
  ROCKET: "ROCKET",
  STRIPE: "STRIPE",
} as const;

export const PAYMENT_GATEWAYS = Object.values(PaymentGateway);

export type PaymentGatewayType =
  (typeof PaymentGateway)[keyof typeof PaymentGateway];

export type PaymentStatusType =
  "pending" | "processing" | "success" | "failed" | "cancelled" | "refunded";

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
  redirectUrl?: string;
  gatewayResponse: unknown | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;

  subscription?: ISubscription;
}
