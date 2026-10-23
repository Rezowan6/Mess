import { useQuery } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IPaginationParams } from "@/shared/types/pagination.types";

export const useEggSummary = (params: IPaginationParams) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: [...queryKeys.eggs.summary(tenantId, mealSessionId), params],

    queryFn: () => eggApi.getSummary(params),

    enabled: Boolean(tenantId && mealSessionId),

    staleTime: 1000 * 60 * 5,
  });
};
