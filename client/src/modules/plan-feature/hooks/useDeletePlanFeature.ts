import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planFeatureApi } from "../api/planFeature.api";

export const useDeletePlanFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: planFeatureApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.planFeatures.list,
      });
    },
  });
};