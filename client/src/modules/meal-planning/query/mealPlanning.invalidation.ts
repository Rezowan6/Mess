import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const invalidateMealPlannigQueries = (
  queryClient: QueryClient,
  { tenantId, mealSessionId }: InvalidationContext,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.mealPreferences.myPreference({
      tenantId,
      mealSessionId,
    }),
  });
};
