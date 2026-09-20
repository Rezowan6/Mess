import { useMutation, useQueryClient } from "@tanstack/react-query";

import { depositApi } from "../api/deposit.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: depositApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deposits.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(tenantId, mealSessionId),
      });
    },
  });
};
