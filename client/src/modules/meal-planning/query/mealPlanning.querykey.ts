export const mealPlannings = {
  all: (tenantId?: number, mealSessionId?: number) =>
    ["meal-planning", tenantId, mealSessionId] as const,

  daily: (tenantId?: number, mealSessionId?: number) =>
    ["meal-planning", tenantId, mealSessionId, "daily"] as const,
};
