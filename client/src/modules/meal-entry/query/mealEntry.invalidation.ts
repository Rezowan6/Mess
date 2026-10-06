import type { QueryClient } from "@tanstack/react-query";

import { invalidateDerived } from "@/services/query/common.invalidation";
import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateMealEntriesQueries = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.mealEntries.all(tenantId, mealSessionId),
  });

  invalidateDerived(queryClient, {
    tenantId,
    mealSessionId,
  });
};
