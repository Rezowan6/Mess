import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const mealPreferences = {
  all: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-preference", tenantId, mealSessionId] as const,

  myPreference: ({ tenantId, mealSessionId }: InvalidationContext) =>
    ["meal-preference", tenantId, mealSessionId, "my"] as const,
};
