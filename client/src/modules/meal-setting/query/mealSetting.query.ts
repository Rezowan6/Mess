import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const mealSettings = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-settings", tenantId, mealSessionId] as const,

  detail: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-settings", tenantId, mealSessionId, "detail"] as const,
};
