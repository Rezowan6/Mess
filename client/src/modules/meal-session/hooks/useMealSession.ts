import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealSessionApi } from "../api/mealSession.api";

export const useMealSession = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.mealSessions.all({tenantId, mealSessionId}),

    queryFn: mealSessionApi.getCurrent,

    enabled: Boolean(tenantId),
  });
};
