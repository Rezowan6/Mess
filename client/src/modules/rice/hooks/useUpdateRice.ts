import { useMutation, useQueryClient } from "@tanstack/react-query";

import { riceApi } from "../api/rice.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateRiceQueries } from "../query/rice.invalidation";
import type { IUpdateRice } from "../types/rice.types";

export const useUpdateRice = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateRice }) =>
      riceApi.update(id, payload),

    onSuccess: () => {
      invalidateRiceQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
