import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealRequestApi } from "../api/mealRequest.api";
import type { IMyPendingMealReqResponse } from "../types/mealRequest.types";

export const useMyPendingMealReq = () => {
  const tenantId = useCurrentTenantId();

  return useQuery<IMyPendingMealReqResponse>({
    queryKey: queryKeys.mealRequests.myRequests(tenantId),

    queryFn: () => mealRequestApi.getMyPendingMealReq(),

    enabled: Boolean(tenantId),

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
};
