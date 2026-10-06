export const deposits = {
  all: (tenantId?: number, mealSessionId?: number) =>
    ["deposits", tenantId, mealSessionId] as const,

  list: (tenantId?: number, mealSessionId?: number) =>
    ["deposits", tenantId, mealSessionId, "list"] as const,

  summary: (tenantId?: number, mealSessionId?: number) =>
    ["deposits", tenantId, mealSessionId, "summary"] as const,

  memberSummary: (tenantId?: number, mealSessionId?: number) =>
    ["deposits", tenantId, mealSessionId, "member-summary"] as const,
};
