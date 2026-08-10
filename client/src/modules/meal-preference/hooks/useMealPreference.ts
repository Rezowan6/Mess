import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { mealPreferenceApi } from "../api/mealPreference.api";

// not apply 

export const useMealPreference = () => {
  return useQuery({
    queryKey: queryKeys.mealPreference.myPreference,

    queryFn: mealPreferenceApi.getMyPreference,
  });
};
