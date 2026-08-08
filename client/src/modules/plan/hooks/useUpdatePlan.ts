import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planApi } from "../api/plan.api";

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<Parameters<typeof planApi.update>[1]>;
    }) => planApi.update(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans.list,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.plans.byId(variables.id),
      });
    },
  });
};