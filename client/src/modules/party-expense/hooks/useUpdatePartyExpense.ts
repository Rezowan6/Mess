// useUpdatePartyExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { partyExpenseApi } from "../api/partyExpense.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useUpdatePartyExpense = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Parameters<typeof partyExpenseApi.update>[1];
    }) => partyExpenseApi.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.partyExpenses.list(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(tenantId),
      });
    },
  });
};
