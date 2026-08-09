import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { featureApi } from "../api/feature.api";
import type { IFeature } from "../types/feature.types";

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<IFeature> }) =>
      featureApi.update(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.features.list,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.features.byId(variables.id),
      });
    },
  });
};
