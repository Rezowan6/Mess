import { useMutation, useQueryClient } from "@tanstack/react-query";

import { riceApi } from "../api/rice.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useDeleteRice = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: riceApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.get(tenantId, mealSessionId),
        refetchType: "active",
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.all(tenantId, mealSessionId),
      });
    },
  });
};