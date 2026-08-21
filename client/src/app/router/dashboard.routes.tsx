import { dashboardModuleRoutes } from "@/modules/dashboard/routes/dashboard.routes";
import { depositRoutes } from "@/modules/deposit/routes/deposit.routes";
import { expenseRoutes } from "@/modules/expense/routes/expense.routes";
import { featureRoutes } from "@/modules/feature/routes/feature.routes";
import { homeRoutes } from "@/modules/home/routes/home.routes";
import { mealEntryRoutes } from "@/modules/meal-entry/routes/mealEntry.routes";
import { mealPlanningRoutes } from "@/modules/meal-planning/routes/mealPlanning.routes";
import { mealPreferenceRoutes } from "@/modules/meal-preference/routes/mealPreference.routes";
import { monthlyCalculationRoutes } from "@/modules/monthly-calculation/routes/monthlyCalculation.routes";
import { myProfileRoutes } from "@/modules/my-profile/routes/myProfile.routes";
import { notificationRoutes } from "@/modules/notification/routes/notification.routes";
import { paymentRoutes } from "@/modules/payment/routes/payment.routes";
import { planFeatureRoutes } from "@/modules/plan-feature/routes/planFeature.routes";
import { planRoutes } from "@/modules/plan/routes/plan.routes";
import { settingRoutes } from "@/modules/settings/routes/setting.routes";
import { subscriptionRoutes } from "@/modules/subscription/routes/subscription.routes";
import { tenantRoutes } from "@/modules/tenant/routes/tenant.routes";
import { userManagementRoutes } from "@/modules/user-management/routes/userManagement.routes";

export const dashboardRoutes = [
  depositRoutes,
  expenseRoutes,
  mealEntryRoutes,
  subscriptionRoutes,
  paymentRoutes,
  mealPlanningRoutes,
  monthlyCalculationRoutes,
  tenantRoutes,
  settingRoutes,
  myProfileRoutes,
  notificationRoutes,
  planRoutes,
  featureRoutes,
  planFeatureRoutes,
  mealPreferenceRoutes,
  userManagementRoutes,
  dashboardModuleRoutes,
  homeRoutes,
];
