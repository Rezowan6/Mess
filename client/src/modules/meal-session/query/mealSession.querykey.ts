import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const mealSessions = {
    all: ({ tenantId, mealSessionId }: InvalidationContext) =>
      ["meal-sessions", tenantId, mealSessionId] as const,
    completed: (tenantId?: number) =>
      ["meal-sessions", tenantId, "completed"] as const,
  }