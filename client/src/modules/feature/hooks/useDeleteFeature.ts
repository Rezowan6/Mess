import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { featureApi } from "../api/feature.api";

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => featureApi.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.features.list,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.features.byId(id),
      });
    },
  });
};
