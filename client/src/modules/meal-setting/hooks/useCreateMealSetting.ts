import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealSettingApi } from "../api/mealSetting.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateMealSettingQueries } from "../query/mealSetting.invalidation";

export const useCreateMealSetting = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: mealSettingApi.create,

    onSuccess: () => {
      invalidateMealSettingQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
