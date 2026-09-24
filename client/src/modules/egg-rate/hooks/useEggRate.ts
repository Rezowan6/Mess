import { useQuery } from "@tanstack/react-query";

import { eggRateApi } from "../api/egg-rate.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useEggRate = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.eggRates.get(tenantId, mealSessionId),
    queryFn: eggRateApi.get,
    enabled: Boolean(tenantId && mealSessionId),
  });
};
