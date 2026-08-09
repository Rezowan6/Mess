import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planFeatureApi } from "../api/planFeature.api";

export const usePlanFeature = (id: number) => {
  return useQuery({
    queryKey: queryKeys.planFeatures.byId(id),
    queryFn: () => planFeatureApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};