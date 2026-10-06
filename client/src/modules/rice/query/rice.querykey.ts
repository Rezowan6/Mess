import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const rice = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["rice", tenantId, mealSessionId] as const,

  get: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["rice", "list", tenantId, mealSessionId] as const,

  summary: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["rice", "summary", tenantId, mealSessionId] as const,

  byId: ({ tenantId, mealSessionId }: InvalidationContext, id?: number) =>
    ["rice", "byId", tenantId, mealSessionId, id] as const,

  due: ({ tenantId, mealSessionId }: InvalidationContext, id?: number) =>
    ["rice", "due", tenantId, mealSessionId, id] as const,
};
