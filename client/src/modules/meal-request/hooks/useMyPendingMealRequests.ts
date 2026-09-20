import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealRequestApi } from "../api/mealRequest.api";
import type { IMyPendingMealReqResponse } from "../types/mealRequest.types";

export const useMyPendingMealReq = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMyPendingMealReqResponse>({
    queryKey: queryKeys.mealRequests.myRequests(tenantId, mealSessionId),

    queryFn: () => mealRequestApi.getMyPendingMealReq(),

    enabled: Boolean(tenantId),

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
};
