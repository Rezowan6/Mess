import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { dashboardApi } from "../api/dashboard.api";
import type { DashboardStatsResponse } from "../types/dashboard.types";

export const useDashboardStats = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<DashboardStatsResponse>({
    queryKey: queryKeys.dashboard.stats(tenantId, mealSessionId),

    queryFn: dashboardApi.dashboardStats,

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
