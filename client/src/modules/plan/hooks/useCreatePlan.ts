import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planApi } from "../api/plan.api";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: planApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans.list,
      });
    },
  });
};
