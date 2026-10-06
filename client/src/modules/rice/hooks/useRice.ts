import { useQuery } from "@tanstack/react-query";

import { riceApi } from "../api/rice.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IPaginationParams } from "@/shared/types/pagination.types";

export const useRice = (params?: IPaginationParams) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  const baseKey = queryKeys.rice.all({ tenantId, mealSessionId });

  return useQuery({
    queryKey: [...baseKey, params],
    queryFn: () => riceApi.getAll(params),
    enabled: Boolean(tenantId && mealSessionId),

    // Keep previous rows only for search/page changes inside the same tenant + session
    placeholderData: (previousData, previousQuery) => {
      const previousBaseKey = previousQuery?.queryKey.slice(0, -1);

      return JSON.stringify(previousBaseKey) === JSON.stringify(baseKey)
        ? previousData
        : undefined;
    },
  });
};
