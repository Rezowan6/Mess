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

  mealSetting: {
    current: ["meal-setting"] as const,
  },

  expenses: {
    all: (tenantId?: number) => ["expenses", tenantId] as const,
  },

  notifications: {
    all: ["notifications"] as const,

    list: (params?: { page?: number; limit?: number }) =>
      ["notifications", "list", params] as const,

    count: ["notifications", "count"] as const,
  },
};
