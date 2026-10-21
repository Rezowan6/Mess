import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateKhalaBillQueries = (
  queryClient: QueryClient,
  { tenantId, }: InvalidationContext,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.khalaBill.all({ tenantId }),
  });
};
