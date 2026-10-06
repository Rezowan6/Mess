import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateNotificationQueries = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.notifications.all({ tenantId, mealSessionId }),
  });
};
