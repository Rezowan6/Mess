// useDeleteExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { expenseApi } from "../api/expense.api";
import { invalidateExpenseQueries } from "../query/expense.invalidation";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (id: number) => expenseApi.delete(id),

    onSuccess: () => {
      invalidateExpenseQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
