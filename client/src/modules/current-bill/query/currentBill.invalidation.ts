import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateCurrentBillQueries = (
  queryClient: QueryClient,
  { tenantId }: InvalidationContext,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.currentBill.all({ tenantId }),
  });
};
