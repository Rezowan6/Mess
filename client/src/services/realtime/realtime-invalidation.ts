import type { QueryClient } from "@tanstack/react-query";

import { invalidateDepositQueries } from "@/modules/deposit/query/deposit.invalidation";
import { invalidateEggRateQueries } from "@/modules/egg-rate/query/eggRate.invalidation";
import { invalidateEggQueries } from "@/modules/egg/query/egg.invalidation";
import { invalidateExpenseQueries } from "@/modules/expense/query/expense.invalidation";
import { invalidateMealEntriesQueries } from "@/modules/meal-entry/query/mealEntry.invalidation";
import { invalidateMealPlanningQueries } from "@/modules/meal-planning/query/mealPlanning.invalidation";
import { invalidateMealPreferenceQueries } from "@/modules/meal-preference/query/mealPreference.invalidation";
import { invalidateMealRequestQueries } from "@/modules/meal-request/query/mealRequest.invalidation";
import { invalidateMealSessionQueries } from "@/modules/meal-session/query/mealSession.invalidation";
import { invalidateMealSettingQueries } from "@/modules/meal-setting/query/mealSetting.invalidation";
import { invalidateMyProfileQueries } from "@/modules/my-profile/query/myProfile.invalidation";
import { invalidatePartyExpenseQueries } from "@/modules/party-expense/query/partyExpense.invalidation";
import { invalidateRicePaymentQueries } from "@/modules/rice-payment/query/ricePayment.invalidation";
import { invalidateRiceQueries } from "@/modules/rice/query/rice.invalidation";
import { invalidateSoldProductQueries } from "@/modules/sold-product/query/soldProduct.invalidation";
import {
  invalidateMembershipQueries,
  invalidateTenantQueries,
} from "@/modules/tenant/query/tenant.invalidation";
import type { IDataUpdatedPayload } from "./realtime.types";

export const invalidateRealtimeQueries = (
  queryClient: QueryClient,
  payload: IDataUpdatedPayload,
) => {
  const { tenantId, mealSessionId, resource } = payload;

  switch (resource) {
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
    case "meal-planning": {
      invalidateMealPlanningQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "party-expense": {
      invalidatePartyExpenseQueries(queryClient, { tenantId, mealSessionId });
      break;
    }
    case "rice": {
      invalidateRiceQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "rice-payment": {
      invalidateRicePaymentQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "tenant": {
      invalidateTenantQueries(queryClient);
      break;
    }

    case "membership": {
      invalidateMembershipQueries(queryClient, tenantId);
      break;
    }

    case "meal-session": {
      invalidateMealSessionQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "meal-setting": {
      invalidateMealSettingQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "meal-entry": {
      invalidateMealEntriesQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "sold-product": {
      invalidateSoldProductQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    case "my-profile": {
      invalidateMyProfileQueries(queryClient, { tenantId, mealSessionId });
      break;
    }

    default:
      break;
  }
};
