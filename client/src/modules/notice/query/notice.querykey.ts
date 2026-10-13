import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const notices = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["notices", tenantId, mealSessionId] as const,

  list: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["notices", tenantId, mealSessionId, "list"] as const,
};