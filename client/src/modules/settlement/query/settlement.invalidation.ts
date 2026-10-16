import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

export const invalidateSettlementQueries = (
  queryClient: QueryClient,
  tenantId?: number,
  mealSessionId?: number,
) => {
  return queryClient.invalidateQueries({
    queryKey: queryKeys.settlements.all(tenantId, mealSessionId),
  });
};
