import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { planFeatureApi } from "../api/planFeature.api";

export const usePlanFeaturesByPlan = (planId: number) => {
  return useQuery({
    queryKey: queryKeys.planFeatures.byPlanId(planId),
    queryFn: () => planFeatureApi.getByPlanId(planId),
    enabled: !!planId,
    staleTime: 1000 * 60 * 5,
  });
};