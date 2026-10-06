import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

/**
 * Invalidates common derived queries affected by financial/session changes.
 */
export const invalidateDerived = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  const keys = [
    queryKeys.monthlyCalculations.current(tenantId, mealSessionId),
    queryKeys.dashboard.all(tenantId, mealSessionId),
    queryKeys.myProfile.current(tenantId, mealSessionId),
  ];

  keys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
};
