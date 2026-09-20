import { useQuery } from "@tanstack/react-query";

import { partyExpenseApi } from "../api/partyExpense.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IPartyExpenseParams } from "../types/partyExpense.types";

export const usePartyExpenses = (params: IPartyExpenseParams) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: [
      ...queryKeys.partyExpenses.list(tenantId, mealSessionId),
      params,
    ],

    queryFn: () => partyExpenseApi.getAll(params),

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
