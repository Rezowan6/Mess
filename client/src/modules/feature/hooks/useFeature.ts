import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { featureApi } from "../api/feature.api";

export const useFeature = (id: number) => {
  return useQuery({
    queryKey: queryKeys.features.byId(id),
    queryFn: () => featureApi.getById(id),
    enabled: !!id,
  });
};