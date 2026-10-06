import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealPreferenceApi } from "../api/mealPreference.api";

// not apply

export const useMealPreference = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.mealPreferences.myPreference({tenantId, mealSessionId}),

    queryFn: mealPreferenceApi.getMyPreference,
  });
};
