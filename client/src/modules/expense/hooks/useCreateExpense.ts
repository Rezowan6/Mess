import { useMutation, useQueryClient } from "@tanstack/react-query";

import { expenseApi } from "../api/expense.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateExpenseQueries } from "../query/expense.invalidation";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: expenseApi.create,

    onSuccess: () => {
      invalidateExpenseQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
