import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { invalidateDepositQueries } from "@/modules/deposit/query/deposit.invalidation";
import { invalidateEggRateQueries } from "@/modules/egg-rate/query/eggRate.invalidation";
import { invalidateEggQueries } from "@/modules/egg/query/egg.invalidation";
import { invalidateExpenseQueries } from "@/modules/expense/query/expense.invalidation";
import { invalidateMealPlannigQueries } from "@/modules/meal-planning/query/mealPlanning.invalidation";
import { invalidateMealPreferenceQueries } from "@/modules/meal-preference/query/mealPreference.invalidation";
import { invalidateMealRequestQueries } from "@/modules/meal-request/query/mealRequest.invalidation";
import { invalidateMealSessionQueries } from "@/modules/meal-session/query/mealSession.invalidation";
import { invalidateMealSettingQueries } from "@/modules/meal-setting/query/mealSetting.invalidation";
import type { IDataUpdatedPayload } from "./realtime.types";

export const invalidateRealtimeQueries = (
  queryClient: QueryClient,
  payload: IDataUpdatedPayload,
) => {
  const { tenantId, mealSessionId, resource } = payload;

  switch (resource) {
    case "meal-planning": {
      invalidateMealPlannigQueries(queryClient, { tenantId, mealSessionId });
      break;
    }
    case "deposit": {
      invalidateDepositQueries(queryClient, {
        tenantId,
        mealSessionId,
      });

      break;
    }

    case "expense": {
      invalidateExpenseQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "egg": {
      invalidateEggQueries(queryClient, { tenantId, mealSessionId });
      break;
    }
    case "egg-rate": {
      invalidateEggRateQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "meal-preference": {
      invalidateMealPreferenceQueries(queryClient, { tenantId, mealSessionId });
      break;
    }
    case "meal-request": {
      invalidateMealRequestQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

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
// 
    case "meal-session": {
      invalidateMealSessionQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "meal-setting": {
      invalidateMealSettingQueries(queryClient, { tenantId, mealSessionId });
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

    case "rice": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.get(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.summary(tenantId, mealSessionId),
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

    case "rice-payment": {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.get(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.all(tenantId, mealSessionId),
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
