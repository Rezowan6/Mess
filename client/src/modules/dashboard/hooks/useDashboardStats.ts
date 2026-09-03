import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { dashboardApi } from "../api/dashboard.api";
import type { DashboardStatsResponse } from "../types/dashboard.types";

export const useDashboardStats = () => {
  const tenantId = useCurrentTenantId();

  return useQuery<DashboardStatsResponse>({
    queryKey: queryKeys.dashboard.stats(tenantId),

    queryFn: dashboardApi.dashboardStats,

    enabled: !!tenantId,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
