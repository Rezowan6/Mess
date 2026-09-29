import { useQuery } from "@tanstack/react-query";

import { riceApi } from "../api/rice.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useRice = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.rice.get(tenantId, mealSessionId),
    queryFn: riceApi.getAll,
    enabled: Boolean(tenantId && mealSessionId),
    staleTime: 1000 * 60 * 5,
  });
};