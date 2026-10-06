import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { depositApi } from "../api/deposit.api";
import { invalidateDepositQueries } from "../query/deposit.invalidation";

export const useDeleteDeposit = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (id: number) => depositApi.delete(id),

    onSuccess: () => {
      invalidateDepositQueries(queryClient, {
        tenantId,
        mealSessionId,
      });
    },
  });
};
