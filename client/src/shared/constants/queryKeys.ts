import { deposits } from "@/modules/deposit/query/deposit.querykey";
import { eggRates } from "@/modules/egg-rate/query/eggRate.querykey";
import { eggs } from "@/modules/egg/query/egg.querykey";
import { expenses } from "@/modules/expense/query/expense.querykey";
import { mealPlannings } from "@/modules/meal-planning/query/mealPlanning.querykey";

export const queryKeys = {
  // ============================================================
  // AUTH
  // ============================================================
  auth: {
    all: ["auth"] as const,
    me: ["auth", "me"] as const,
  },

  // ============================================================
  // TENANTS
  // ============================================================
  tenants: {
    all: ["tenants"] as const,
    allMembers: (tenantId?: number, search?: string) =>
      ["tenants", tenantId, "members", "all", { search }] as const,
    members: (tenantId?: number) => ["tenants", tenantId, "members"] as const,
    invites: (tenantId?: number) => ["tenants", tenantId, "invites"] as const,
  },

  // ============================================================
  // PLANS
  // ============================================================

  plans: {
    all: ["plans"] as const,

    list: ["plans", "list"] as const,

    byId: (id: number) => ["plans", id] as const,
  },

  // ============================================================
  // FEATURES
  // ============================================================

  features: {
    all: ["features"] as const,

    list: ["features", "list"] as const,

    byId: (id: number) => ["features", "byId", id] as const,
  },

  // ============================================================
  // PLAN FEATURES
  // ============================================================

  planFeatures: {
    all: ["planFeatures"] as const,

    list: ["planFeatures", "list"] as const,

    byId: (id: number) => ["planFeatures", id] as const,

    byPlanId: (planId: number | undefined) =>
      ["planFeatures", "plan", planId] as const,
  },

  // ============================================================
  // SUBSCRIPTIONS
  // Subscription is tenant based, not meal-session based.
  // ============================================================
  subscriptions: {
    all: (tenantId?: number) => ["subscriptions", tenantId] as const,

    current: (tenantId?: number) =>
      ["subscriptions", tenantId, "current"] as const,

    mySubscriptions: (tenantId?: number) =>
      ["subscriptions", tenantId, "my-subscriptions"] as const,

    byId: (tenantId?: number | undefined, id?: number) =>
      ["subscriptions", tenantId, "byId", id] as const,
  },

  // ============================================================
  // PAYMENTS
  // Payment is tenant/subscription based, not meal-session based.
  // ============================================================
  payments: {
    all: (tenantId?: number) => ["payments", tenantId] as const,

    list: (tenantId?: number) => ["payments", tenantId, "list"] as const,

    byId: (tenantId?: number | undefined, id?: number) =>
      ["payments", tenantId, "byId", id] as const,

    bySubscriptionId: (
      tenantId?: number | undefined,
      subscriptionId?: number,
    ) => ["payments", tenantId, "bySubscriptionId", subscriptionId] as const,
  },

  // ============================================================
  // MONTHLY CALCULATIONS
  // Session based
  // ============================================================

  monthlyCalculations: {
    current: (tenantId?: number, mealSessionId?: number) =>
      ["monthly-calculations", tenantId, mealSessionId, "current"] as const,
  },

  // ============================================================
  // MY PROFILE
  // Profile is tenant based, meal-session based.
  // ============================================================

  myProfile: {
    current: (tenantId?: number, mealSessionId?: number) =>
      ["my-profile", tenantId, mealSessionId, "current"] as const,
    all: (tenantId?: number, mealSessionId?: number) =>
      ["my-profile", tenantId, mealSessionId, "current"] as const,
  },

  // ============================================================
  // MEAL SESSIONS
  // Session list itself does not need another session ID.
  // ============================================================
  mealSessions: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["meal-sessions", tenantId, mealSessionId] as const,
    completed: (tenantId?: number) =>
      ["meal-sessions", tenantId, "completed"] as const,
  },

  // ============================================================
  // MEAL ENTRIES
  // Tenant + Meal Session based
  // ============================================================
  mealEntries: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId] as const,

    membersMealSummary: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId, "member-meal-summary"] as const,

    list: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId, "list"] as const,

    my: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId, "my"] as const,

    todayMeals: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId, "daily"] as const,

    dailySummary: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId, "daily-summary"] as const,

    summary: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId, "summary"] as const,

    memberSummary: (tenantId?: number, mealSessionId?: number) =>
      ["mealEntries", tenantId, mealSessionId, "member-summary"] as const,
  },

  // ============================================================
  // MEAL REQUESTS
  // Tenant + Meal Session based
  // ============================================================
  mealRequests: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["meal-requests", tenantId, mealSessionId] as const,

    list: (tenantId?: number, mealSessionId?: number) =>
      ["meal-requests", tenantId, mealSessionId] as const,

    myRequests: (tenantId?: number, mealSessionId?: number) =>
      ["meal-requests", tenantId, mealSessionId, "my"] as const,

    allRequests: (tenantId?: number, mealSessionId?: number) =>
      ["meal-requests", tenantId, mealSessionId, "all"] as const,

    pending: (tenantId?: number, mealSessionId?: number) =>
      ["meal-requests", tenantId, mealSessionId, "pending"] as const,
  },

  // ============================================================
  // MEAL PREFERENCE
  // Tenant + Meal Session based
  // ============================================================
  mealPreference: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["meal-preference", tenantId, mealSessionId] as const,

    myPreference: (tenantId?: number, mealSessionId?: number) =>
      ["meal-preference", tenantId, mealSessionId, "my"] as const,
  },

  // ============================================================
  // MEAL PLANNING
  // Tenant + Meal Session based
  // ============================================================
  mealPlannings,

  // ============================================================
  // MEAL SETTINGS
  // Tenant + Meal Session based
  // ============================================================

  mealSettings: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["meal-settings", tenantId, mealSessionId] as const,

    detail: (tenantId?: number, mealSessionId?: number) =>
      ["meal-settings", tenantId, mealSessionId, "detail"] as const,
  },

  // ============================================================
  // DEPOSITS
  // Tenant + Meal Session based
  // ============================================================
  deposits,
  // ============================================================
  // EGGS
  // Tenant + Meal Session based
  // ============================================================

  eggs,
  // ============================================================
  // EGG RATES
  // Tenant + meal-session based
  // ============================================================

  eggRates,

  // ============================================================
  // SOLD PRODUCTS
  // Tenant + meal-session based
  // ============================================================

  soldProducts: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["soldProducts", tenantId, mealSessionId] as const,

    get: (tenantId?: number, mealSessionId?: number) =>
      ["soldProducts", tenantId, mealSessionId, "get"] as const,
  },

  // ============================================================
  // DASHBOARD
  // Tenant + Meal Session based
  // ============================================================

  dashboard: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["dashboard", tenantId, mealSessionId] as const,

    stats: (tenantId?: number, mealSessionId?: number) =>
      ["dashboard", tenantId, mealSessionId, "stats"] as const,

    mealTrend: (tenantId?: number, mealSessionId?: number) =>
      ["dashboard", tenantId, mealSessionId, "meal-trend"] as const,
  },

  // ============================================================
  // EXPENSES
  // Tenant + Meal Session based
  // ============================================================

  expenses,

  // ============================================================
  // RICE
  // Tenant + Meal Session based
  // ============================================================

  rice: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["rice", tenantId, mealSessionId] as const,

    get: (tenantId?: number, mealSessionId?: number) =>
      ["rice", "list", tenantId, mealSessionId] as const,

    summary: (tenantId?: number, mealSessionId?: number) =>
      ["rice", "summary", tenantId, mealSessionId] as const,

    byId: (tenantId?: number, mealSessionId?: number, id?: number) =>
      ["rice", "byId", tenantId, mealSessionId, id] as const,

    due: (tenantId?: number, mealSessionId?: number, id?: number) =>
      ["rice", "due", tenantId, mealSessionId, id] as const,
  },

  // ============================================================
  // RICE PAYMENT
  // Tenant + Meal Session + Rice based
  // ============================================================

  ricePayments: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["ricePayments", tenantId, mealSessionId] as const,

    get: (tenantId?: number, mealSessionId?: number, riceId?: number) =>
      ["ricePayments", "list", tenantId, mealSessionId, riceId] as const,

    byId: (
      tenantId?: number,
      mealSessionId?: number,
      riceId?: number,
      id?: number,
    ) => ["ricePayments", "byId", tenantId, mealSessionId, riceId, id] as const,

    totalPaid: (tenantId?: number, mealSessionId?: number, riceId?: number) =>
      ["ricePayments", "totalPaid", tenantId, mealSessionId, riceId] as const,

    due: (tenantId?: number, mealSessionId?: number, riceId?: number) =>
      ["ricePayments", "due", tenantId, mealSessionId, riceId] as const,
  },
  // ============================================================
  // PARTY EXPENSES
  // Tenant + Meal Session based
  // ============================================================
  partyExpenses: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["partyExpenses", tenantId, mealSessionId] as const,

    list: (tenantId?: number, mealSessionId?: number) =>
      ["partyExpenses", tenantId, mealSessionId, "list"] as const,
  },

  // ============================================================
  // NOTIFICATIONS
  // Tenant + Meal Session based
  // ============================================================
  notifications: {
    all: (tenantId?: number, mealSessionId?: number) =>
      ["notifications", tenantId, mealSessionId] as const,

    list: (
      tenantId?: number,
      mealSessionId?: number,
      params?: { page?: number; limit?: number },
    ) => ["notifications", tenantId, mealSessionId, "list", params] as const,

    count: (tenantId?: number, mealSessionId?: number) =>
      ["notifications", tenantId, mealSessionId, "count"] as const,
  },
};
