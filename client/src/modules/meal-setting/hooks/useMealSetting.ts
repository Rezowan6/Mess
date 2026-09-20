import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealSettingApi } from "../api/mealSetting.api";

export const useMealSetting = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.mealSettings.all(tenantId, mealSessionId),

    queryFn: mealSettingApi.getCurrent,
  });
};
