// useDeletePartyExpense.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { partyExpenseApi } from "../api/partyExpense.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidatePartyExpenseQueries } from "../query/partyExpense.invalidation";

export const useDeletePartyExpense = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: partyExpenseApi.delete,

    onSuccess: () => {
      invalidatePartyExpenseQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
