import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealSessionApi } from "../api/mealSession.api";

export const useMealSession = () => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: queryKeys.mealSessions.all(tenantId),

    queryFn: mealSessionApi.getCurrent,
  });
};
