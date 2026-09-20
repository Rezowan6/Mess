import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type {
  IMealEntryQuery,
  IMealEntrySummaryResponse,
} from "../types/mealEntry.types";

export const useMealEntrySummary = (params?: IMealEntryQuery) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMealEntrySummaryResponse>({
    queryKey: [
      ...queryKeys.mealEntries.summary(tenantId, mealSessionId),
      params,
    ],

    queryFn: async () => await mealEntryApi.summary(params),

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
