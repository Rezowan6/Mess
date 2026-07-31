import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealSettingApi } from "../api/mealSetting.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

export const useUpdateMealSetting = () => {
  const queryClient = useQueryClient();

  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: mealSettingApi.update,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSettings.all(currentTenant?.tenantId),
      });
    },
  });
};
