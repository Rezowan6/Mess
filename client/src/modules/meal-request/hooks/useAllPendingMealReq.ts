import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealRequestApi } from "../api/mealRequest.api";
import type { IMyPendingMealReqResponse } from "../types/mealRequest.types";

export const useAllPendingMealReq = () => {
  const tenantId = useCurrentTenantId();

  return useQuery<IMyPendingMealReqResponse>({
    queryKey: queryKeys.mealRequests.allRequests(tenantId),

    queryFn: () => mealRequestApi.getAllPendingMealReq(),

    enabled: Boolean(tenantId),

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
};