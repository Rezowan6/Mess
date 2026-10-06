import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const soldProducts = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["soldProducts", tenantId, mealSessionId] as const,

  get: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["soldProducts", tenantId, mealSessionId, "get"] as const,
};
