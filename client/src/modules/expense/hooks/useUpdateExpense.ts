// useUpdateExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";

import { expenseApi } from "../api/expense.api";

import type { IUpdateExpenseDto } from "../types/expense.types";

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateExpenseDto }) =>
      expenseApi.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.expenses.list(currentTenant?.tenantId)],
      });

      queryClient.invalidateQueries({
        queryKey: [...queryKeys.expenses.summary(currentTenant?.tenantId)],
      });
    },
  });
};
