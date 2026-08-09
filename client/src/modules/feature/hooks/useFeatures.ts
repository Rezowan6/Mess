import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { featureApi } from "../api/feature.api";

export const useFeatures = () => {
  return useQuery({
    queryKey: queryKeys.features.list,
    queryFn: featureApi.getAll,
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 5,
  });
};