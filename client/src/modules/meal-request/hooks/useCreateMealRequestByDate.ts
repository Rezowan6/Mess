import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealRequestApi } from "../api/mealRequest.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useCreateMealRequestByDate = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: mealRequestApi.createByDate,

    onSuccess: () => {
      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.myRequests(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(tenantId, mealSessionId),
      });
    },
  });
};
