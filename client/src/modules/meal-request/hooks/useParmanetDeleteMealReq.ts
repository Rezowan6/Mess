import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealRequestApi } from "../api/mealRequest.api";
import { invalidateMealRequestQueries } from "../query/mealRequest.invalidation";

export const useParmanetDeleteMealReq = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (id: number) => mealRequestApi.parmanetDeleteMealReq(id),

    onSuccess: () => {
      invalidateMealRequestQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
