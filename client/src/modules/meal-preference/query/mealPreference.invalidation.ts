import type { QueryClient } from "@tanstack/react-query";

import { invalidateMealPlanningQueries } from "@/modules/meal-planning/query/mealPlanning.invalidation";
import { invalidateMealRequestQueries } from "@/modules/meal-request/query/mealRequest.invalidation";
import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateMealPreferenceQueries = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  invalidateMealRequestQueries(queryClient, { tenantId, mealSessionId });
  invalidateMealPlanningQueries(queryClient, { tenantId, mealSessionId });
  
  queryClient.invalidateQueries({
    queryKey: queryKeys.mealPreferences.all({ tenantId, mealSessionId }),
  });
};
