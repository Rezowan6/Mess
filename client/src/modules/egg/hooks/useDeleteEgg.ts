import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eggApi } from "../api/egg.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useDeleteEgg = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({
      id,
      memberId,
    }: {
      id: number;
      memberId: number;
    }) =>
      eggApi.delete(id, {
        memberId,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.list(tenantId, mealSessionId),
      });
    },
  });
};
