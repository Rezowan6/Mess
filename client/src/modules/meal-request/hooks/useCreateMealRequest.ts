import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealRequestApi } from "../api/mealRequest.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { showApiErrorToast, showSuccessToast } from "@/shared/utils/toast";

export const useCreateMealRequest = () => {
  const queryClient = useQueryClient();
  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: mealRequestApi.create,

    onSuccess: (response) => {
      const result = response?.data;

      if (!result) {
        showApiErrorToast("Invalid response from server.");
        return;
      }

      const {
        createdCount = 0,
        skippedCount = 0,
        totalRequestedDays = 0,
      } = result;

      if (createdCount === 0 && skippedCount > 0) {
        showSuccessToast(
          `No new meal request created. ${skippedCount} of ${totalRequestedDays} day(s) were skipped.`,
        );

        return;
      }

      if (createdCount > 0) {
        showSuccessToast(
          `${createdCount} meal request${
            createdCount > 1 ? "s" : ""
          } created successfully.`,
        );
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.list(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(tenantId),
      });
    },

    onError: (error) => {
      showApiErrorToast(error);
    },
  });
};
