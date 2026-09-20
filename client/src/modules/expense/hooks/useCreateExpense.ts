import { useMutation, useQueryClient } from "@tanstack/react-query";

import { expenseApi } from "../api/expense.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

   const { tenantId, mealSessionId } = useCurrentTenantContext();
 

  return useMutation({
    mutationFn: expenseApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.summary(tenantId, mealSessionId),
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
