export const ROUTES = {
  HOME: "/home",

  LOGIN: "/login",
  FORBIDDEN: "/403",
  VERIFY_EMAIL: "/verify-email/:token",

  INVITES_ACCEPT: "/invite/accept/:token",

  REGISTER: "/register",

  DASHBOARD: "/dashboard",

  MY_PROFILE: "/my-profile",

  TENANT: "/create-mess",

  USERS: "/users",

  PREFERENCE: "/preferences",

  MEAL_SESSION: "/meal-sessions",

  MEAL_ENTRY: "/meal-entries",

  MEAL_REQUEST: "/meal-request",

  MEAL_PLANNING: "/meal-planning",

  NOTIFICATIONS: "/notifications",
  NOTICE: "/notices",

  EXPENSE: "/expenses",

  PARTY_EXPENSE: "/party-expenses",

  DEPOSIT: "/deposits",

  MONTHLY_CALCULATION: "/monthly-calculation",

  PLANS: "/plans",
  FEATURE: "/features",
  PLAN_FEATURE: "/plan-features",
  SUBSCRIPTION: "/subscription",

  PAYMENT: "/payments",

  SETTINGS: "/settings",

  PAYMENT_METHOD: "/payment-methods",

  SETTLEMENT: "/settlements",
} as const;
