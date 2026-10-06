import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const notifications = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["notifications", tenantId, mealSessionId] as const,

  list: (
    { tenantId, mealSessionId }: InvalidationContext,
    params?: { page?: number; limit?: number },
  ) => ["notifications", tenantId, mealSessionId, "list", params] as const,

  count: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["notifications", tenantId, mealSessionId, "count"] as const,
};
