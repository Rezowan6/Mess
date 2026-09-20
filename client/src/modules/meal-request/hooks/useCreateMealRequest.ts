import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealRequestApi } from "../api/mealRequest.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import {
  showApiErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/shared/utils/toast";

export interface MealRequestResult {
  createdCount: number;
  skippedCount: number;
  totalRequestedDays: number;
  skippedRequests: {
    date: string;
    reason: string;
  }[];
}

export const useCreateMealRequest = (
  setRequestResult: React.Dispatch<
    React.SetStateAction<MealRequestResult | null>
  >,
) => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

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

      // Save result for UI
      setRequestResult({
        createdCount,
        skippedCount,
        totalRequestedDays,
        skippedRequests,
      });

      // Nothing created
      if (createdCount === 0 && skippedCount > 0) {
        showWarningToast(
          `No new meal request created. ${skippedCount} of ${totalRequestedDays} day(s) were skipped.`,
        );
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
      if (createdCount > 0 && skippedCount > 0) {
        showWarningToast(
          `${skippedCount} of ${totalRequestedDays} day(s) were skipped.`,
        );
      }

      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.myRequests(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(tenantId, mealSessionId),
      });
    },

    onError: (error) => {
      showApiErrorToast(error);
    },
  });
};
