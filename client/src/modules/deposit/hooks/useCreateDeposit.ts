import { useMutation, useQueryClient } from "@tanstack/react-query";

import { depositApi } from "../api/deposit.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateDepositQueries } from "../query/deposit.invalidation";

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: depositApi.create,

    onSuccess: () => {
      invalidateDepositQueries(queryClient, {
        tenantId,
        mealSessionId,
      });
    },
  });
};
