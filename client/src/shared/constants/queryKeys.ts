export const queryKeys = {
  auth: {
    all: ["auth"] as const,

    me: ["auth", "me"] as const,
  },

  tenants: {
    all: ["tenants"] as const,

    members: (tenantId?: number) => ["tenants", tenantId, "members"] as const,

    invites: (tenantId?: number) => ["tenants", tenantId, "invites"] as const,
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
    myPreference: ["meal-preference"],
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

  notifications: {
    all: ["notifications"] as const,

    list: (params?: { page?: number; limit?: number }) =>
      ["notifications", "list", params] as const,

    count: ["notifications", "count"] as const,
  },
};
