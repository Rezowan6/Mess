import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { settlementApi } from "../api/settlement.api";
import { invalidateSettlementQueries } from "../query/settlement.invalidation";
import type { ICreateSettlementDto } from "../types/settlement.types";

export const useCreateSettlement = () => {
  const queryClient = useQueryClient();
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (payload: ICreateSettlementDto) =>
      settlementApi.create(payload),

    onSuccess: () =>
      invalidateSettlementQueries(queryClient, tenantId, mealSessionId),
  });
};
