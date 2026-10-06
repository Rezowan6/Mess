import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const partyExpenses = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["partyExpenses", tenantId, mealSessionId] as const,

  list: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["partyExpenses", tenantId, mealSessionId, "list"] as const,
};
