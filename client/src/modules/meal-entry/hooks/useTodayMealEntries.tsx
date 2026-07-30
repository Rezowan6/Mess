import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import type {
  IMealEntryListResponse,
  IMealEntryQuery,
} from "../types/mealEntry.types";

export const useTodayMealEntries = (params?: IMealEntryQuery) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<IMealEntryListResponse>({
    queryKey: [...queryKeys.mealEntries.todayMeals(currentTenant?.tenantId), params],

    queryFn: async () => await mealEntryApi.todayMealEntries(params),

    enabled: !!currentTenant,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
