import { useQuery } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";
import { mealSettingApi } from "../api/mealSetting.api";

export const useMealSetting = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery({
    queryKey: queryKeys.mealSettings.all(currentTenant?.tenantId),

    queryFn: mealSettingApi.getCurrent,
  });
};
