import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealPlanningApi } from "../api/mealPlanning.api";
import type { MealType } from "../types/mealPlanning.types";

export const useRejectMeal = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: ({
      userId,
      meal,
    }: {
      userId: number;
      meal: MealType
    }) => mealPlanningApi.rejectMeal(userId, meal),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId),
      });
    },
  });
};
