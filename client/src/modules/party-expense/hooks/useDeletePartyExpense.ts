// useDeletePartyExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { partyExpenseApi } from "../api/partyExpense.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useDeletePartyExpense = () => {
  const queryClient = useQueryClient();

   const { tenantId, mealSessionId } = useCurrentTenantContext();
 

  return useMutation({
    mutationFn: partyExpenseApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.partyExpenses.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(tenantId, mealSessionId),
      });
    },
  });
};
