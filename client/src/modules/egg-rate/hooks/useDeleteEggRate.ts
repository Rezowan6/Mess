import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eggRateApi } from "../api/egg-rate.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useDeleteEggRate = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: eggRateApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggRates.get(tenantId, mealSessionId),
      });
    },
  });
};
