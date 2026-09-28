import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import type { IDataUpdatedPayload } from "./realtime.types";

export const invalidateRealtimeQueries = (
  queryClient: QueryClient,
  payload: IDataUpdatedPayload,
) => {
  const { tenantId, mealSessionId, resource } = payload;

  switch (resource) {
    case "tenant": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.all,
      });

      break;
    }

    case "membership": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myProfile.all(tenantId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.allMembers(tenantId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.members(tenantId),
      });

      break;
    }

    case "meal-session": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSessions.all(tenantId),
      });

      break;
    }

    case "meal-setting": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSettings.all(tenantId, mealSessionId),
      });

      break;
    }

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
        queryKey: queryKeys.eggs.all(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.summary(tenantId, mealSessionId),
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

    case "party-expense": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.partyExpenses.all(tenantId, mealSessionId),
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

    case "egg-rate": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggRates.all(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggRates.get(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.all(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.eggs.summary(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(
          tenantId,
          mealSessionId,
        ),
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
