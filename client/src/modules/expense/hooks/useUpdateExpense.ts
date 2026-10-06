// useUpdateExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { expenseApi } from "../api/expense.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateExpenseQueries } from "../query/expense.invalidation";
import type { IUpdateExpenseDto } from "../types/expense.types";

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateExpenseDto }) =>
      expenseApi.update(id, payload),

    onSuccess: () => {
      invalidateExpenseQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
