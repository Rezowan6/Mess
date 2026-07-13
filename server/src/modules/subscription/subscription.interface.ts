export const SubscriptionStatus = {
  FREE: "FREE",
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  EXPIRED: "EXPIRED",
  CANCELED: "CANCELED",
} as const;

export const SUBSCRIPTION_STATUSES = Object.values(SubscriptionStatus);

export type SubscriptionStatusType =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
