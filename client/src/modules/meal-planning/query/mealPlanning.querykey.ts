import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const mealPlannings = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-planning", tenantId, mealSessionId] as const,

  daily: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-planning", tenantId, mealSessionId, "daily"] as const,
};
