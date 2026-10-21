import { setupCurrentBillAssociations } from "@/modules/currentBill/currentBill.association.js";
import { setupDepositAssociations } from "@/modules/deposit/deposit.association.js";
import { setupEggAssociations } from "@/modules/egg/egg.association.js";
import { setupEggRateAssociations } from "@/modules/eggRates/eggRate.association.js";
import { setupExpenseAssociations } from "@/modules/expenses/expense.association.js";
import { setupInviteAssociations } from "@/modules/invite/invite.association.js";
import { setupKhalaBillAssociations } from "@/modules/khalaBill/khalaBill.association.js";
import { setupMealEntryAssociations } from "@/modules/mealEntry/mealEntry.association.js";
import { setupMealPreferenceAssociations } from "@/modules/MealPreference/mealPreference.association.js";
import { setupMealRequestAssociations } from "@/modules/mealRequest/mealRequest.association.js";
import { setupMealSessionAssociations } from "@/modules/mealSession/mealSession.association.js";
import { setupMealSettingAssociations } from "@/modules/mealSetting/mealSetting.association.js";
import { setupNoticeAssociations } from "@/modules/notice/notice.association.js";
import { setupNotificationAssociations } from "@/modules/notification/notification.association.js";
import { setupPartyExpenseAssociations } from "@/modules/PartyExpense/partyExpense.association.js";
import { setupPaymentAssociations } from "@/modules/payment/payment.association.js";
import { setupPlanFeatureAssociations } from "@/modules/planFeature/planFeature.association.js";
import { setupRefreshTokenAssociations } from "@/modules/refreshToken/refreshToken.association.js";
import { setupRiceAssociations } from "@/modules/rice/rice.association.js";
import { setupSoldProductAssociations } from "@/modules/soldProduct/soldProduct.association.js";
import { setupSubscriptionAssociations } from "@/modules/subscription/subscription.association.js";
import { setupTenantMembershipAssociations } from "@/modules/tenantMembership/tenantMembership.association.js";

export const setupAssociations = () => {
  setupTenantMembershipAssociations();
  setupInviteAssociations();
  setupRefreshTokenAssociations();
  setupMealSessionAssociations();
  setupMealEntryAssociations();
  setupMealRequestAssociations();
  setupExpenseAssociations();
  setupDepositAssociations();
  setupNoticeAssociations();
  setupPlanFeatureAssociations();
  setupSubscriptionAssociations();
  setupPaymentAssociations();
  setupMealSettingAssociations();
  setupMealPreferenceAssociations();
  setupPartyExpenseAssociations();

  setupRiceAssociations();
  setupNotificationAssociations();
  setupEggAssociations();
  setupEggRateAssociations();
  setupSoldProductAssociations();

  setupCurrentBillAssociations();
  setupKhalaBillAssociations();
};
