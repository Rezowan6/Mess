import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import type {
  IMealEntryQuery,
  IMealEntrySummaryResponse,
} from "../types/mealEntry.types";

export const useDailyMealSummary = (params?: IMealEntryQuery) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<IMealEntrySummaryResponse>({
    queryKey: [
      ...queryKeys.mealEntries.dailySummary(currentTenant?.tenantId),
      params,
    ],

    queryFn: async () => await mealEntryApi.dailySummary(params),

    enabled: !!currentTenant,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
