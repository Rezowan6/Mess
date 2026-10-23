export const settlements = {
  all: (tenantId?: number, mealSessionId?: number) =>
    ["settlements", tenantId, mealSessionId] as const,

  list: (tenantId?: number, mealSessionId?: number) =>
    ["settlements", tenantId, mealSessionId, "list"] as const,

  detail: (
    tenantId: number | undefined,
    mealSessionId: number | undefined,
    id: number,
  ) => ["settlements", tenantId, mealSessionId, "detail", id] as const,
};
