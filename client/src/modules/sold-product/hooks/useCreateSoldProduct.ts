import { useMutation, useQueryClient } from "@tanstack/react-query";

import { soldProductApi } from "../api/soldProduct.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateSoldProductQueries } from "../query/soldProduct.invalidation";

export const useCreateSoldProduct = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: soldProductApi.create,

    onSuccess: () => {
      invalidateSoldProductQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
