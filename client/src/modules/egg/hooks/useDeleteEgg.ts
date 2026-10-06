import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateEggQueries } from "../query/egg.invalidation";

export const useDeleteEgg = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ id, memberId }: { id: number; memberId: number }) =>
      eggApi.delete(id, {
        memberId,
      }),

    onSuccess: () => {
      invalidateEggQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
