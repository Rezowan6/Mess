import { useQuery } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IPaginationParams } from "@/shared/types/pagination.types";

export const useEggs = (params: IPaginationParams) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: [...queryKeys.eggs.list(tenantId, mealSessionId), params],
    queryFn: () => eggApi.getAll(params),
    enabled: Boolean(tenantId && mealSessionId),
  });
};
