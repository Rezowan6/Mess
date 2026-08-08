import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planApi } from "../api/plan.api";

export const usePlans = () => {
  return useQuery({
    queryKey: queryKeys.plans.list,

    queryFn: () => planApi.getAll(),

    staleTime: 1000 * 60 * 5,
  });
};
