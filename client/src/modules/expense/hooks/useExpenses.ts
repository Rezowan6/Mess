import { useQuery } from "@tanstack/react-query";

import { expenseApi } from "../api/expense.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type {
  IExpenseListResponse,
  IExpenseQuery,
} from "../types/expense.types";

export const useExpenses = (params?: IExpenseQuery) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IExpenseListResponse>({
    queryKey: [...queryKeys.expenses.list(tenantId, mealSessionId), params],

    queryFn: async () => await expenseApi.getAll(params),

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
