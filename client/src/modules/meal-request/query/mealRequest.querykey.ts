import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const mealRequests = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-requests", tenantId, mealSessionId] as const,

  list: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-requests", tenantId, mealSessionId] as const,

  myRequests: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-requests", tenantId, mealSessionId, "my"] as const,

  allRequests: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-requests", tenantId, mealSessionId, "all"] as const,

  pending: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-requests", tenantId, mealSessionId, "pending"] as const,
};
