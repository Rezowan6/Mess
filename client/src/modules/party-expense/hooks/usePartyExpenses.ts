import { useQuery } from "@tanstack/react-query";

import { partyExpenseApi } from "../api/partyExpense.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import type { IPartyExpenseParams } from "../types/partyExpense.types";

export const usePartyExpenses = (params: IPartyExpenseParams) => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: [...queryKeys.partyExpenses.list(tenantId), params],

    queryFn: () => partyExpenseApi.getAll(params),

    enabled: !!tenantId,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
