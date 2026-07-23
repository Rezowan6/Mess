export const Notification = {
  MEMBER_JOINED: "MEMBER_JOINED",

  ROLE_UPDATED: "ROLE_UPDATED",

  MEAL_REQUEST: "MEAL_REQUEST",

  EXPENSE_CREATED: "EXPENSE_CREATED",

  PAYMENT_SUCCESS: "PAYMENT_SUCCESS",

  SYSTEM: "SYSTEM",
} as const;

export type NotificationType = (typeof Notification)[keyof typeof Notification];
