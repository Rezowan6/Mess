export const PERMISSIONS = {
  // User
  USER_VIEW: "user.view",
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",
  USER_INVITE: "user.invite",

  // Meal Session
  MEAL_SESSION_VIEW: "meal_session.view",
  MEAL_SESSION_CREATE: "meal_session.create",
  MEAL_SESSION_UPDATE: "meal_session.update",
  MEAL_SESSION_CLOSE: "meal_session.close",

  // Meal Entry
  MEAL_ENTRY_VIEW: "meal_entry.view",
  MEAL_ENTRY_CREATE: "meal_entry.create",
  MEAL_ENTRY_UPDATE: "meal_entry.update",

  // Expense
  EXPENSE_VIEW: "expense.view",
  EXPENSE_CREATE: "expense.create",
  EXPENSE_UPDATE: "expense.update",
  EXPENSE_DELETE: "expense.delete",

  // Deposit
  DEPOSIT_VIEW: "deposit.view",
  DEPOSIT_CREATE: "deposit.create",
  DEPOSIT_UPDATE: "deposit.update",

  // Calculation
  CALCULATION_VIEW: "calculation.view",
  CALCULATION_RUN: "calculation.run",

  // Notice
  NOTICE_VIEW: "notice.view",
  NOTICE_CREATE: "notice.create",
  NOTICE_UPDATE: "notice.update",

  // Settings
  SETTINGS_VIEW: "settings.view",
  SETTINGS_UPDATE: "settings.update",

  // Subscription
  SUBSCRIPTION_VIEW: "subscription.view",
  SUBSCRIPTION_MANAGE: "subscription.manage",

  // System
  SYSTEM_MANAGE: "system.manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
