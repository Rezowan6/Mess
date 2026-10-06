import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateRiceQueries = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.rice.all({ tenantId, mealSessionId }),
  });

  queryClient.invalidateQueries({
    queryKey: queryKeys.monthlyCalculations.current(tenantId, mealSessionId),
  });

  queryClient.invalidateQueries({
    queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
  });
};
