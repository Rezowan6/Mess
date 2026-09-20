import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { dashboardApi } from "../api/dashboard.api";
import type { MealTrendResponse } from "../types/dashboard.types";

export const useMealTrend = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<MealTrendResponse>({
    queryKey: queryKeys.dashboard.mealTrend(tenantId, mealSessionId),

    queryFn: dashboardApi.dashboardMealTrend,

    enabled: !!tenantId,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
