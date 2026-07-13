export const PaymentGateway = {
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
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  CANCELED: "CANCELED",
} as const;

export const PAYMENT_STATUSES = Object.values(PaymentStatus);

export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];