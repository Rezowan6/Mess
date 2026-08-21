import { useQuery } from "@tanstack/react-query";

import { partyExpenseApi } from "../api/partyExpense.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const usePartyExpenses = () => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: queryKeys.partyExpenses.list(tenantId),

    queryFn: partyExpenseApi.getAll,

    enabled: !!tenantId,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
