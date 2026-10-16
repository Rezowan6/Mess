import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { settlementApi } from "../api/settlement.api";
import { invalidateSettlementQueries } from "../query/settlement.invalidation";
import type { IUpdateSettlementDto } from "../types/settlement.types";

interface UpdateSettlementVariables {
  id: number;
  payload: IUpdateSettlementDto;
}

export const useUpdateSettlement = () => {
  const queryClient = useQueryClient();
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateSettlementVariables) =>
      settlementApi.update(id, payload),

    onSuccess: () =>
      invalidateSettlementQueries(queryClient, tenantId, mealSessionId),
  });
};
