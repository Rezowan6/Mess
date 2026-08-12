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

export const PaymentStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
} as const;

export const PAYMENT_STATUSES = Object.values(PaymentStatus);

export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];

/**
 * Create Payment Input
 *
 * Tenant selects a subscription
 * and chooses payment gateway
 */
export interface ICreatePaymentInput {
  tenantId: number;

  subscriptionId: number;

  gateway: PaymentGatewayType;
}

/**
 * Payment Gateway Initiate Response
 *
 * Every gateway should return this format
 *
 * bKash / Nagad / Rocket / Stripe
 * will map their response here
 */
export interface IPaymentInitiateResponse {
  success: boolean;

  paymentId: number;

  gateway: PaymentGatewayType;

  /**
   * Redirect URL
   *
   * bKash:
   * https://checkout.bka.sh/...
   *
   * Stripe:
   * checkout session url
   */
  redirectUrl?: string;

  /**
   * Gateway generated id
   *
   * Example:
   * bKash paymentID
   * Stripe sessionId
   */
  gatewayPaymentId?: string;

  message?: string;
}

/**
 * Payment Verification Response
 *
 * Used after callback/webhook
 */
export interface IPaymentVerifyResponse {
  success: boolean;

  transactionId?: string | null;

  gatewayPaymentId?: string;

  paidAt?: Date;

  gatewayResponse?: unknown;

  message?: string;
}

/**
 * Gateway callback payload
 *
 * Every gateway has different payload
 *
 * So keep flexible
 */
export interface IPaymentCallbackPayload {
  gateway: PaymentGatewayType;

  transactionId?: string;

  gatewayPaymentId?: string;

  payload: unknown;
}

/**
 * Payment Gateway Contract
 *
 * All gateways must implement this
 *
 * Example:
 *
 * BkashGateway implements IPaymentGateway
 * StripeGateway implements IPaymentGateway
 */
export interface IPaymentGateway {
  initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse>;

  verifyPayment(gatewayPaymentId: string): Promise<IPaymentVerifyResponse>;

  /**
   * Optional
   * Future refund support
   */
  refundPayment?(transactionId: string, amount: number): Promise<boolean>;
}
