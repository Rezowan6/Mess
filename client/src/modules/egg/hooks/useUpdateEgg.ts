import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateEggQueries } from "../query/egg.invalidation";
import type { IUpdateEggDto } from "../types/egg.types";

export const useUpdateEgg = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateEggDto }) =>
      eggApi.update(id, payload),

    onSuccess: () => {
      invalidateEggQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
