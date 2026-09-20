import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { depositApi } from "../api/deposit.api";

export const useDeleteDeposit = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId, } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (id: number) => depositApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deposits.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(tenantId, mealSessionId),
      });
    },
  });
};
