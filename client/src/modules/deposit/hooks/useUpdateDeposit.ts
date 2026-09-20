import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { depositApi } from "../api/deposit.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IUpdateDepositDto } from "../types/deposit.types";

export const useUpdateDeposit = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateDepositDto }) =>
      depositApi.update(id, payload),

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
    },
  });
};
