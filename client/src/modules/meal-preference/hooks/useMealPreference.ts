import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealPreferenceApi } from "../api/mealPreference.api";

// not apply

export const useMealPreference = () => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.mealPreference.myPreference(tenantId),

    queryFn: mealPreferenceApi.getMyPreference,
  });
};
