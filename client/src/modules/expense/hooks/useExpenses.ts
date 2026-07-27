import { useQuery } from "@tanstack/react-query";

import { expenseApi } from "../api/expense.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import type {
  IExpenseListResponse,
  IExpenseQuery,
} from "../types/expense.types";

export const useExpenses = (params?: IExpenseQuery) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<IExpenseListResponse>({
    queryKey: [...queryKeys.expenses.list(currentTenant?.tenantId), params],

    queryFn: async () => await expenseApi.getAll(params),

    enabled: !!currentTenant,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
