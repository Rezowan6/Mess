import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eggRateApi } from "../api/egg-rate.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateEggRateQueries } from "../query/eggRate.invalidation";

export const useCreateEggRate = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: eggRateApi.create,

    onSuccess: () => {
      invalidateEggRateQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
