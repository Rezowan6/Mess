import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { featureApi } from "../api/feature.api";

export const useCreateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: featureApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.features.list,
      });
    },
  });
};