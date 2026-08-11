import { useQuery } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";

import { mealPlanningApi } from "../api/mealPlanning.api";

import type { IMealPlanningResponse } from "../types/mealPlanning.types";

export const useMealPlanning = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<IMealPlanningResponse>({
    queryKey: queryKeys.mealPlanning.daily(
      currentTenant?.tenantId,
    ),

    queryFn: () => mealPlanningApi.getDailyMealPlanning(),

    enabled: Boolean(
      currentTenant?.tenantId,
    ),

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
};
