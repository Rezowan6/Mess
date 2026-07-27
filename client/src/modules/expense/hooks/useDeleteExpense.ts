// useDeleteExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";

import { expenseApi } from "../api/expense.api";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: (id: number) => expenseApi.delete(id),

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
