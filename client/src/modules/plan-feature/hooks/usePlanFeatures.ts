import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planFeatureApi } from "../api/planFeature.api";

export const usePlanFeatures = () => {
  return useQuery({
    queryKey: queryKeys.planFeatures.list,
    queryFn: planFeatureApi.getAll,
    staleTime: 1000 * 60 * 5,
  });
};