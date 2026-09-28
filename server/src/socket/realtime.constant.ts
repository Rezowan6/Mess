// done list: deposit, expens, egg,

export const RealtimeResource = {
  MEAL_PLANNING: "meal-planning",
  MEAL_PREFERENCE: "meal-preference",
  MEAL_REQUEST: "meal-request",
  MEAL_ENTRY: "meal-entry",

  EXPENSE: "expense",
  DEPOSIT: "deposit",
  EGG: "egg",
  SOLD_PRODUCT: "sold-product",

  MONTHLY_CALCULATION: "monthly-calculation",

  SUBSCRIPTION: "subscription",
  PAYMENT: "payment",

  DASHBOARD: "dashboard",
  MY_PROFILE: "my-profile",
} as const;

export type RealtimeResourceType =
  (typeof RealtimeResource)[keyof typeof RealtimeResource];

export const RealtimeAction = {
  CREATED: "created",
  UPDATED: "updated",
  DELETED: "deleted",
} as const;

export type RealtimeActionType =
  (typeof RealtimeAction)[keyof typeof RealtimeAction];
