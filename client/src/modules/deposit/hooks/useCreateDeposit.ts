import { useMutation, useQueryClient } from "@tanstack/react-query";

import { depositApi } from "../api/deposit.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: depositApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deposits.list(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(tenantId),
      });
    },
  });
};
