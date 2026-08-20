import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealSettingApi } from "../api/mealSetting.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useCreateMealSetting = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: mealSettingApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSettings.all(tenantId),
      });
    },
  });
};
