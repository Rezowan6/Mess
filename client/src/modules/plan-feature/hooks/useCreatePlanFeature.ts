import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planFeatureApi } from "../api/planFeature.api";

export const useCreatePlanFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: planFeatureApi.create,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.planFeatures.list,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.planFeatures.byPlanId(variables.planId),
      });
    },
  });
};