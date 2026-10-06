import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealRequestApi } from "../api/mealRequest.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateMealRequestQueries } from "../query/mealRequest.invalidation";

export const useCreateMealRequestByDate = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: mealRequestApi.createByDate,

    onSuccess: () => {
      invalidateMealRequestQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
