

export const RealtimeResource = {
  TENANT: "tenant",

  MEMBERSHIP: "membership",

  MEAL_SESSION: "meal-session",
  MEAL_SETTING: "meal-setting",

  MEAL_PLANNING: "meal-planning",
  MEAL_PREFERENCE: "meal-preference",
  MEAL_REQUEST: "meal-request",

  EXPENSE: "expense",
  DEPOSIT: "deposit",
  RICE: "rice",
  RICE_PAYMENT: "rice-payment",
  EGG: "egg",
  EGG_RATE: "egg-rate",
  PARTY_EXPENSE: "party-expense",
  SOLD_PRODUCT: "sold-product",

  MY_PROFILE:"my-profile",
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
