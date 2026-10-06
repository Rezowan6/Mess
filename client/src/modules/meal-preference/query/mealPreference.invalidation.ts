import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateMealPreferenceQueries = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.mealPreferences.all({ tenantId, mealSessionId }),
  });

  queryClient.invalidateQueries({
    queryKey: queryKeys.mealRequests.all({ tenantId, mealSessionId }),
  });
  queryClient.invalidateQueries({
    queryKey: queryKeys.mealPlannings.daily({ tenantId, mealSessionId }),
  });
};
