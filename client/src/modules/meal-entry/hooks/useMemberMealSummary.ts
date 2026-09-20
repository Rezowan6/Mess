import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type {
  IMealEntryQuery,
  IMealEntrySummaryResponse,
} from "../types/mealEntry.types";

export const useMemberMealSummary = (params?: IMealEntryQuery) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMealEntrySummaryResponse>({
    queryKey: [
      ...queryKeys.mealEntries.memberSummary(tenantId, mealSessionId),
      params,
    ],

    queryFn: async () => await mealEntryApi.memberSummary(params),

    enabled: !!tenantId,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
