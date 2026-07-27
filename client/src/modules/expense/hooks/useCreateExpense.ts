import { useMutation, useQueryClient } from "@tanstack/react-query";

import { expenseApi } from "../api/expense.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: expenseApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.list(currentTenant?.tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.summary(currentTenant?.tenantId),
      });
    },
  });
};
