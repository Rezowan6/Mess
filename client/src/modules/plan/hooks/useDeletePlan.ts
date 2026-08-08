import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planApi } from "../api/plan.api";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: planApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans.list,
      });
    },
  });
};
