import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const ricePayments = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["ricePayments", tenantId, mealSessionId] as const,

  get: ({ tenantId, mealSessionId }: InvalidationContext, riceId?: number) =>
    ["ricePayments", "list", tenantId, mealSessionId, riceId] as const,

  byId: (
    tenantId?: number,
    mealSessionId?: number,
    riceId?: number,
    id?: number,
  ) => ["ricePayments", "byId", tenantId, mealSessionId, riceId, id] as const,

  totalPaid: ({ tenantId, mealSessionId }: InvalidationContext, riceId?: number) =>
    ["ricePayments", "totalPaid", tenantId, mealSessionId, riceId] as const,

  due: ({ tenantId, mealSessionId }: InvalidationContext, riceId?: number) =>
    ["ricePayments", "due", tenantId, mealSessionId, riceId] as const,
};
