import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { settlementApi } from "../api/settlement.api";
import { invalidateSettlementQueries } from "../query/settlement.invalidation";

export const useDeleteSettlement = () => {
  const queryClient = useQueryClient();
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (id: number) => settlementApi.delete(id),

    onSuccess: () =>
      invalidateSettlementQueries(queryClient, tenantId, mealSessionId),
  });
};
