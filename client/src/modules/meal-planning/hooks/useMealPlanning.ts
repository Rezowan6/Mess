import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { mealPlanningApi } from "../api/mealPlanning.api";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import type { IMealPlanningResponse } from "../types/mealPlanning.types";

export const useMealPlanning = () => {
  const tenantId = useCurrentTenantId();

  return useQuery<IMealPlanningResponse>({
    queryKey: queryKeys.mealPlanning.daily(tenantId),

    queryFn: () => mealPlanningApi.getDailyMealPlanning(),

    enabled: Boolean(tenantId),

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
};
