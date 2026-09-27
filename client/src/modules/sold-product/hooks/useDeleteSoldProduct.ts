import { useMutation, useQueryClient } from "@tanstack/react-query";

import { soldProductApi } from "../api/soldProduct.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useDeleteSoldProduct = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: soldProductApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.soldProducts.get(tenantId, mealSessionId),
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.soldProducts.all(tenantId, mealSessionId),
      });
    },
  });
};
