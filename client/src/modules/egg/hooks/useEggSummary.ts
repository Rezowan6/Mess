import { useQuery } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useEggSummary = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.eggs.summary(tenantId, mealSessionId),

    queryFn: eggApi.getSummary,

    enabled: Boolean(tenantId && mealSessionId),

    staleTime: 1000 * 60 * 5,
  });
};
