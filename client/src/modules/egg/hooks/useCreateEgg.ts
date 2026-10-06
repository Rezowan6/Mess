import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateEggQueries } from "../query/egg.invalidation";

export const useCreateEgg = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: eggApi.create,

    onSuccess: () => {
      invalidateEggQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
