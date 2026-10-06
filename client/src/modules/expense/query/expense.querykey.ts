export const expenses = {
  all: (tenantId?: number, mealSessionId?: number) =>
    ["expenses", tenantId, mealSessionId] as const,

  list: (tenantId?: number, mealSessionId?: number) =>
    ["expenses", tenantId, mealSessionId, "list"] as const,

  summary: (tenantId?: number, mealSessionId?: number) =>
    ["expenses", tenantId, mealSessionId, "summary"] as const,
};
