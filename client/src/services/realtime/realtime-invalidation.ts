import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import type { IDataUpdatedPayload } from "./realtime.types";

export const invalidateRealtimeQueries = (
  queryClient: QueryClient,
  payload: IDataUpdatedPayload,
) => {
  const { tenantId, mealSessionId, resource } = payload;

  switch (resource) {
    case "meal-planning": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPreference.myPreference(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealEntries.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      break;
    }

    case "meal-preference": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPreference.myPreference(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),
      });

      break;
    }

    case "meal-request": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealEntries.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      break;
    }

    case "meal-entry": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealEntries.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.myProfile.current(tenantId, mealSessionId),
      });

      break;
    }

    case "expense": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      break;
    }

    case "deposit": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deposits.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.myProfile.current(tenantId, mealSessionId),
      });

      break;
    }

    case "egg": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.myProfile.current(tenantId, mealSessionId),
      });

      break;
    }

    case "sold-product": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.soldProducts.get(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      break;
    }

    case "subscription": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.current(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      break;
    }

    case "payment": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.all(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.current(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      break;
    }

    case "dashboard": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.all(tenantId, mealSessionId),
      });

      break;
    }

    case "my-profile": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myProfile.current(tenantId, mealSessionId),
      });

      break;
    }

    default:
      break;
  }
};
