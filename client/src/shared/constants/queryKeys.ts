export const queryKeys = {
  auth: {
    all: ["auth"] as const,

    me: ["auth", "me"] as const,
  },

  tenants: {
    all: ["tenants"] as const,

    allMembers: (tenantId?: number) =>
      ["tenants", tenantId, "members", "all"] as const,

    members: (tenantId?: number) => ["tenants", tenantId, "members"] as const,

    invites: (tenantId?: number) => ["tenants", tenantId, "invites"] as const,
  },

  plans: {
    all: ["plans"] as const,

    list: ["plans", "list"] as const,

    byId: (id: number) => ["plans", id] as const,
  },

  features: {
    all: ["features"] as const,

    list: ["features", "list"] as const,

    byId: (id: number) => ["features", "byId", id] as const,
  },

  planFeatures: {
    all: ["planFeatures"] as const,

    list: ["planFeatures", "list"] as const,

    byId: (id: number) => ["planFeatures", id] as const,

    byPlanId: (planId: number | undefined) =>
      ["planFeatures", "plan", planId] as const,
  },

  subscriptions: {
    all: (tenantId?: number) => ["subscriptions", tenantId] as const,

    current: (tenantId?: number) =>
      ["subscriptions", tenantId, "current"] as const,

    mySubscriptions: (tenantId?: number) =>
      ["subscriptions", tenantId, "my-subscriptions"] as const,

    byId: (tenantId: number | undefined, id: number) =>
      ["subscriptions", tenantId, "byId", id] as const,
  },

  payments: {
    all: (tenantId?: number) => ["payments", tenantId] as const,

    list: (tenantId?: number) => ["payments", tenantId, "list"] as const,

    byId: (tenantId: number | undefined, id: number) =>
      ["payments", tenantId, "byId", id] as const,

    bySubscriptionId: (tenantId: number | undefined, subscriptionId: number) =>
      ["payments", tenantId, "bySubscriptionId", subscriptionId] as const,
  },
  monthlyCalculations: {
    current: (tenantId?: number) =>
      ["monthly-calculations", tenantId, "current"] as const,
  },
  myProfile: {
    current: (tenantId?: number) =>
      ["my-profile", tenantId, "current"] as const,
  },
  mealSessions: {
    all: (tenantId?: number) => ["meal-sessions", tenantId] as const,
  },

  mealEntries: {
    all: (tenantId?: number) => ["mealEntries", tenantId] as const,

    membersMealSummary: (tenantId?: number) =>
      ["mealEntries", tenantId, "member-meal-summary"] as const,

    list: (tenantId?: number) => ["mealEntries", tenantId, "list"] as const,

    my: (tenantId?: number) => ["mealEntries", tenantId, "my"] as const,

    todayMeals: (tenantId?: number) =>
      ["mealEntries", tenantId, "daily"] as const,

    dailySummary: (tenantId?: number) =>
      ["mealEntries", tenantId, "daily-summary"] as const,

    summary: (tenantId?: number) =>
      ["mealEntries", tenantId, "summary"] as const,

    memberSummary: (tenantId?: number) =>
      ["mealEntries", tenantId, "member-summary"] as const,
  },

  mealRequests: {
    all: (tenantId?: number) => ["meal-requests", tenantId] as const,

    myRequests: (tenantId?: number) =>
      ["meal-requests", tenantId, "my"] as const,

    pending: (tenantId?: number) =>
      ["meal-requests", tenantId, "pending"] as const,
  },

  mealPreference: {
    all: (tenantId?: number) => ["meal-preference", tenantId] as const,

    myPreference: (tenantId?: number) =>
      ["meal-preference", tenantId, "my"] as const,
  },

  mealPlanning: {
    all: (tenantId?: number) => ["meal-planning", tenantId] as const,

    daily: (tenantId?: number) => ["meal-planning", tenantId, "daily"] as const,
  },

  mealSettings: {
    all: (tenantId?: number) => ["meal-settings", tenantId] as const,

    detail: (tenantId?: number) =>
      ["meal-settings", tenantId, "detail"] as const,
  },

  deposits: {
    all: (tenantId?: number) => ["deposits", tenantId] as const,

    list: (tenantId?: number) => ["deposits", tenantId, "list"] as const,
  },

  expenses: {
    all: (tenantId?: number) => ["expenses", tenantId] as const,

    list: (tenantId?: number) => ["expenses", tenantId, "list"] as const,

    summary: (tenantId?: number) => ["expenses", tenantId, "summary"] as const,
  },

  partyExpenses: {
    all: (tenantId?: number) => ["partyExpenses", tenantId] as const,

    list: (tenantId?: number) => ["partyExpenses", tenantId, "list"] as const,
  },

  notifications: {
    all: (tenantId?: number) => ["notifications", tenantId] as const,

    list: (tenantId?: number, params?: { page?: number; limit?: number }) =>
      ["notifications", tenantId, "list", params] as const,

    count: (tenantId?: number) => ["notifications", tenantId, "count"] as const,
  },
};
