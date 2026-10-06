import { useMutation, useQueryClient } from "@tanstack/react-query";

import { depositApi } from "../api/deposit.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateDepositQueries } from "../query/invalidation/deposit.invalidation";
import type { IUpdateDepositDto } from "../types/deposit.types";

export const useUpdateDeposit = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateDepositDto }) =>
      depositApi.update(id, payload),

    onSuccess: () => {
      invalidateDepositQueries(queryClient, {
        tenantId,
        mealSessionId,
      });
    },
  });
};
