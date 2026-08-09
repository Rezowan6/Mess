import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planFeatureApi } from "../api/planFeature.api";

export const useUpdatePlanFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<Parameters<typeof planFeatureApi.update>[1]>;
    }) => planFeatureApi.update(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.planFeatures.list,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.planFeatures.byId(variables.id),
      });
    },
  });
};