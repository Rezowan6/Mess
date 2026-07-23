export const queryKeys = {
  auth: ["auth"] as const,

  authMe: ["auth_me"] as const,

  tenantMembers: (tenantId?: number) => ["tenant-members", tenantId] as const,

  invites: (tenantId?: number) => ["invites", tenantId] as const,

  mealSessions: (tenantId?: number) => ["meal-sessions", tenantId] as const,

  expenses: (tenantId?: number) => ["expenses", tenantId] as const,

  notifications: {
    all: ["notifications"] as const,

    list: (params?: { page?: number; limit?: number }) =>
      ["notifications", "list", params] as const,

    lists:["notifications","list"] as const,

    count: ["notifications", "count"] as const,
  },
};
