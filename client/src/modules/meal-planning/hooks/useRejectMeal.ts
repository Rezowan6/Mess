import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealPlanningApi } from "../api/mealPlanning.api";
import type { IMealType } from "../types/mealPlanning.types";

export const useRejectMeal = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ userId, meal }: { userId: number; meal: IMealType }) =>
      mealPlanningApi.rejectMeal(userId, meal),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),
      });
    },
  });
};
