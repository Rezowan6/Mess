export const eggRates = {
  all: (tenantId?: number, mealSessionId?: number) =>
    ["eggRates", tenantId, mealSessionId] as const,

  get: (tenantId?: number, mealSessionId?: number) =>
    ["eggRates", tenantId, mealSessionId, "get"] as const,
};
