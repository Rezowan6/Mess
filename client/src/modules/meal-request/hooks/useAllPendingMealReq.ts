import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealRequestApi } from "../api/mealRequest.api";
import type { IMyPendingMealReqResponse } from "../types/mealRequest.types";

export const useAllPendingMealReq = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMyPendingMealReqResponse>({
    queryKey: queryKeys.mealRequests.allRequests(tenantId, mealSessionId),

    queryFn: () => mealRequestApi.getAllPendingMealReq(),

    enabled: Boolean(tenantId && mealSessionId),

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
};
