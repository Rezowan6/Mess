import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealRequestApi } from "../api/mealRequest.api";

export const useParmanetDeleteMealReq = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (id: number) => mealRequestApi.parmanetDeleteMealReq(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.list(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.myRequests(tenantId, mealSessionId),
      });
    },
  });
};
