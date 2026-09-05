import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealRequestApi } from "../api/mealRequest.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { formatDateTime } from "@/shared/utils/time";
import { showApiErrorToast, showSuccessToast, showWarningToast } from "@/shared/utils/toast";

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
        skippedRequests = [],
      } = result;

      // No request created
      if (createdCount === 0 && skippedCount > 0) {
        const reasons = skippedRequests
          .map(
            (item: { date: string; reason: string }) =>
              `${formatDateTime(item.date)} — ${item.reason}`,
          )
          .join("\n");

        showWarningToast(`No new meal request created.\n${reasons}`);

        return;
      }

      // Request created
      if (createdCount > 0) {
        showSuccessToast(
          `${createdCount} meal request${
            createdCount > 1 ? "s" : ""
          } created successfully.`,
        );
      }

      // Some days skipped
      if (skippedCount > 0) {
        const reasons = skippedRequests
          .map(
            (item: { date: string; reason: string }) =>
              `${formatDateTime(item.date)} — ${item.reason}`,
          )
          .join("\n");

        showApiErrorToast(
          `${skippedCount} of ${totalRequestedDays} day(s) were skipped.\n${reasons}`,
        );
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.list(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.myRequests(tenantId),
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
