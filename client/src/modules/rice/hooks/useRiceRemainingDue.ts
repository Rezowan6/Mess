import { useQuery } from "@tanstack/react-query";

import { riceApi } from "../api/rice.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useRiceRemainingDue = (id: number) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.rice.due({ tenantId, mealSessionId }, id),
    queryFn: () => riceApi.getRemainingDue(id),
    enabled: Boolean(tenantId && mealSessionId && id),
    staleTime: 1000 * 60 * 5,
  });
};
