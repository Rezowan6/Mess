import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useCreateEgg = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: eggApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.list(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.summary(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.all(tenantId, mealSessionId),
      });
    },
  });
};
