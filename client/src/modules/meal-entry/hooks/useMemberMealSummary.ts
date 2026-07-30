import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import type {
  IMealEntryQuery,
  IMealEntrySummaryResponse,
} from "../types/mealEntry.types";

export const useMemberMealSummary = (params?: IMealEntryQuery) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<IMealEntrySummaryResponse>({
    queryKey: [
      ...queryKeys.mealEntries.memberSummary(currentTenant?.tenantId),
      params,
    ],

    queryFn: async () => await mealEntryApi.memberSummary(params),

    enabled: !!currentTenant,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
