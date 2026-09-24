import { useQuery } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useEggs = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.eggs.list(tenantId, mealSessionId),
    queryFn: eggApi.getAll,
    enabled: !!tenantId && !!mealSessionId,
  });
};