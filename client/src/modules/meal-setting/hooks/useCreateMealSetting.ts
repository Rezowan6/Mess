import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealSettingApi } from "../api/mealSetting.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useCreateMealSetting = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: mealSettingApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSettings.all(tenantId, mealSessionId),
      });
    },
  });
};
