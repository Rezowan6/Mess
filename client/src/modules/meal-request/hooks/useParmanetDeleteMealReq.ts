import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealRequestApi } from "../api/mealRequest.api";

export const useParmanetDeleteMealReq = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (id: number) => mealRequestApi.parmanetDeleteMealReq(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.list(tenantId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.myRequests(tenantId),
      });
    },
  });
};
