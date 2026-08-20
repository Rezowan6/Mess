// useUpdateExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { expenseApi } from "../api/expense.api";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import type { IUpdateExpenseDto } from "../types/expense.types";

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateExpenseDto }) =>
      expenseApi.update(id, payload),

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
    },
  });
};
