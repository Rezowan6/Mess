import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planApi } from "../api/plan.api";

export const usePlan = (id: number) => {
  return useQuery({
    queryKey: queryKeys.plans.byId(id),

    queryFn: () => planApi.getById(id!),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
  });
};
