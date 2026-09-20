import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealSessionApi } from "../api/mealSession.api";

export const useCompletedMealSessions = () => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: queryKeys.mealSessions.completed(tenantId),

    queryFn: () => mealSessionApi.getCompleted(),

    // AxiosResponse -> ApiResponse -> শুধু array
    select: (response) => response.data.data,

    // Tenant না থাকলে request-ই যাবে না
    enabled: Boolean(tenantId),

    // History কম বদলায়। Session close হলে useCloseMealSession নিজেই invalidate করে
    staleTime: 5 * 60 * 1000,
  });
};