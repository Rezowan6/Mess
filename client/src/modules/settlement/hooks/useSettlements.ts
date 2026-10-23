import { useQuery } from "@tanstack/react-query";

import { settlementApi } from "../api/settlement.api";
import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useSettlements = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.settlements.list(tenantId, mealSessionId),
    queryFn: settlementApi.getAll,
    enabled: Boolean(tenantId && mealSessionId),
    staleTime: 1000 * 60,
  });
};