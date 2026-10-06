export const eggs = {
  all: (tenantId?: number, mealSessionId?: number) =>
    ["eggs", tenantId, mealSessionId] as const,

  list: (tenantId?: number, mealSessionId?: number) =>
    ["eggs", tenantId, mealSessionId, "list"] as const,

  summary: (tenantId?: number, mealSessionId?: number) =>
    ["eggs", tenantId, mealSessionId, "summary"] as const,
};
