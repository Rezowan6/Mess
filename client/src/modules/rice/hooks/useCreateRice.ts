import { useMutation, useQueryClient } from "@tanstack/react-query";

import { riceApi } from "../api/rice.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateRiceQueries } from "../query/rice.invalidation";

export const useCreateRice = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: riceApi.create,

    onSuccess: () => {
      invalidateRiceQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
