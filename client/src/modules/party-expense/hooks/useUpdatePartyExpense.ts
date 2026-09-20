// useUpdatePartyExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { partyExpenseApi } from "../api/partyExpense.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useUpdatePartyExpense = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Parameters<typeof partyExpenseApi.update>[1];
    }) => partyExpenseApi.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.partyExpenses.list(tenantId, mealSessionId),
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
