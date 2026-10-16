import { useQuery } from "@tanstack/react-query";

import { settlementApi } from "../api/settlement.api";
import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useSettlement = (id: number) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.settlements.detail(
      tenantId,
      mealSessionId,
      id,
    ),
    queryFn: () => settlementApi.getById(id),
    enabled: Boolean(tenantId && mealSessionId && id > 0),
    staleTime: 1000 * 60,
  });
};