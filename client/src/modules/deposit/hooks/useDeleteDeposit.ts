import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { depositApi } from "../api/deposit.api";

export const useDeleteDeposit = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (id: number) => depositApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deposits.list(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(tenantId),
      });
    },
  });
};
