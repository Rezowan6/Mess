import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealPlanningApi } from "../api/mealPlanning.api";
import { invalidateMealPlannigQueries } from "../query/mealPlanning.invalidation";
import type { IMealType } from "../types/mealPlanning.types";

export const useRejectMeal = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ userId, meal }: { userId: number; meal: IMealType }) =>
      mealPlanningApi.rejectMeal(userId, meal),

    onSuccess: () => {
      invalidateMealPlannigQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
