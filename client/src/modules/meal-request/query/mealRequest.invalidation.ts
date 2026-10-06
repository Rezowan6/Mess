import type { QueryClient } from "@tanstack/react-query";

import { invalidateMealPlanningQueries } from "@/modules/meal-planning/query/mealPlanning.invalidation";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateMealRequestQueries = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  invalidateMealPlanningQueries(queryClient, { tenantId, mealSessionId });

  queryClient.invalidateQueries({
    queryKey: queryKeys.mealRequests.all({ tenantId, mealSessionId }),
  });
};
