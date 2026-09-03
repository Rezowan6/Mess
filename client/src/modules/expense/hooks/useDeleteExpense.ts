// useDeleteExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { expenseApi } from "../api/expense.api";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (id: number) => expenseApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.list(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.summary(tenantId),
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
