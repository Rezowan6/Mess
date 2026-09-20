import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { mealPlanningApi } from "../api/mealPlanning.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IMealPlanningResponse } from "../types/mealPlanning.types";

export const useMealPlanning = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMealPlanningResponse>({
    queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),

    queryFn: () => mealPlanningApi.getDailyMealPlanning(),

    enabled: Boolean(tenantId && mealSessionId),

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
};
