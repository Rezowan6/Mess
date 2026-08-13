import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./protected.route";
import { PublicRoute } from "./public.route";

import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { UserManagementPage } from "@/modules/user-management/pages/UserManagementPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { HomePage } from "@/pages/HomePage";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { RoleGuard } from "@/shared/guards/role.guard";

import { RegisterPage } from "@/modules/auth/pages/RegisterPage";
import { DepositTable } from "@/modules/deposit/components/DepositTable";
import { DepositAddPage } from "@/modules/deposit/pages/DepositAddPage";
import { DepositHistoryPage } from "@/modules/deposit/pages/DepositHistoryPage";
import { DepositPage } from "@/modules/deposit/pages/DepositPage";
import { ExpensePage } from "@/modules/expense/pages/ExpensePage";
import { FeatureTable } from "@/modules/feature/components/FeatureTable";
import { FeaturePage } from "@/modules/feature/pages/FeaturePage";
import { AcceptInvitePage } from "@/modules/invite/pages/AcceptInvitePage";
import { LandingLayout } from "@/modules/landing/layouts/LandingLayout";
import { LandingPage } from "@/modules/landing/pages/LandingPage";
import { MealEntryPage } from "@/modules/meal-entry/pages/MealEntryPage";
import { MealHistoryPage } from "@/modules/meal-entry/pages/MealHistoryPage";
import { MembersMealSummaryPage } from "@/modules/meal-entry/pages/MembersMealSummaryPage";
import { TodayMealEntriesPage } from "@/modules/meal-entry/pages/TodayMealEntriesPage";
import { MealPlanningLayout } from "@/modules/meal-planning/layouts/MealPlanningLayout";
import { MealPlanningPage } from "@/modules/meal-planning/pages/MealPlanningPage";
import { MealPreferencePage } from "@/modules/meal-preference/pages/MealPreferencePage";
import { MealSettingManagePage } from "@/modules/meal-setting/pages/MealSettingManagePage";
import { MonthlyCalculationPage } from "@/modules/monthly-calculation/pages/MonthlyCalculationPage";
import { MyProfileLayout } from "@/modules/my-profile/layout/MyProfileLayout";
import { MyDepositHistoryPage } from "@/modules/my-profile/pages/MyDepositHistoryPage";
import { MyMealHistoryPage } from "@/modules/my-profile/pages/MyMealHistoryPage";
import { MyProfilePage } from "@/modules/my-profile/pages/MyProfilePage";
import { NotificationPage } from "@/modules/notification/pages/NotificationPage";
import { PaymentLayout } from "@/modules/payment/layouts/PaymentLayout";
import { PaymentCheckoutPage } from "@/modules/payment/pages/PaymentCheckoutPage";
import { PaymentDetailsPage } from "@/modules/payment/pages/PaymentDetailsPage";
import { PaymentHistoryPage } from "@/modules/payment/pages/PaymentHistoryPage";
import { PaymentPage } from "@/modules/payment/pages/PaymentPage";
import { PaymentResultPage } from "@/modules/payment/pages/PaymentResultPage";
import { PlanFeatureTable } from "@/modules/plan-feature/components/PlanFeatureTable";
import { PlanFeaturePage } from "@/modules/plan-feature/pages/PlanFeaturePage";
import { PlanTable } from "@/modules/plan/components/PlanTable";
import { PlanDetailsPage } from "@/modules/plan/pages/PlanDetailsPage";
import { PlanManagementPage } from "@/modules/plan/pages/PlanManagementPage";
import { GeneralSettingsPage } from "@/modules/settings/pages/GeneralSettingsPage";
import { SettingsPage } from "@/modules/settings/pages/SettingsPage";
import { SubscriptionLayout } from "@/modules/subscription/layouts/SubscriptionLayout";
import { SubscriptionDetailsPage } from "@/modules/subscription/pages/SubscriptionDetailsPage";
import { SubscriptionHistoryPage } from "@/modules/subscription/pages/SubscriptionHistoryPage";
import { SubscriptionPage } from "@/modules/subscription/pages/SubscriptionPage";
import { UpgradePlanPage } from "@/modules/subscription/pages/UpgradePlanPage";
import { TenantPage } from "@/modules/tenant/pages/TenantPage";
import { DashboardLayout } from "../layouts/Dashboard.layout";

export const router = createBrowserRouter([
  // Public Routes
  {
    element: <PublicRoute />,

    children: [
      {
        path: "/",
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: ROUTES.INVITES_ACCEPT,
            element: <AcceptInvitePage />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: (
              <RoleGuard
                allowedRoles={[ROLES.MANAGER, ROLES.ADMIN, ROLES.MEMBER]}
              />
            ),

            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
            ],
          },

          {
            path: ROUTES.USERS,

            element: <PermissionGuard permission={PERMISSIONS.USER_VIEW} />,

            children: [
              {
                index: true,
                element: <UserManagementPage />,
              },
            ],
          },
          {
            path: ROUTES.DEPOSIT,

            element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

            children: [
              {
                element: <DepositPage />,

                children: [
                  {
                    index: true,
                    element: <DepositTable />,
                  },
                  {
                    path: "quick-add",
                    element: <DepositAddPage />,
                  },
                  {
                    path: "history",
                    element: <DepositHistoryPage />,
                  },
                ],
              },
            ],
          },

          {
            path: ROUTES.MEAL_ENTRY,

            element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

            children: [
              {
                element: <MealEntryPage />,

                children: [
                  {
                    index: true,
                    element: <MembersMealSummaryPage />,
                  },
                  {
                    path: "history",
                    element: <MealHistoryPage />,
                  },
                  {
                    path: "today-meals",
                    element: <TodayMealEntriesPage />,
                  },
                ],
              },
            ],
          },
          {
            path: ROUTES.SUBSCRIPTION,

            element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

            children: [
              {
                element: <SubscriptionLayout />,

                children: [
                  {
                    index: true,
                    element: <SubscriptionPage />,
                  },
                  {
                    path: "upgrade",
                    element: <UpgradePlanPage />,
                  },
                  {
                    path: "history",
                    element: <SubscriptionHistoryPage />,
                  },
                  {
                    path: ":id",
                    element: <SubscriptionDetailsPage />,
                  },
                ],
              },
            ],
          },

          {
            path: ROUTES.PAYMENT,

            element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

            children: [
              {
                element: <PaymentLayout />,

                children: [
                  {
                    index: true,
                    element: <PaymentPage />,
                  },
                  {
                    path: ":id",
                    element: <PaymentDetailsPage />,
                  },
                  {
                    path: "history",
                    element: <PaymentHistoryPage />,
                  },
                  {
                    path: "checkout",
                    element: <PaymentCheckoutPage />,
                  },
                  {
                    path: "result",
                    element: <PaymentResultPage />,
                  },
                ],
              },
            ],
          },

          {
            path: ROUTES.MEAL_PLANNING,

            element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

            children: [
              {
                element: <MealPlanningLayout />,

                children: [
                  {
                    index: true,
                    element: <MealPlanningPage />,
                  },
                ],
              },
            ],
          },

          {
            path: ROUTES.MONTHLY_CALCULATION,

            element: <RoleGuard allowedRoles={[ROLES.MANAGER]} />,

            children: [
              {
                index: true,
                element: <MonthlyCalculationPage />,
              },
            ],
          },

          {
            path: ROUTES.TENANT,
            element: <TenantPage />,
          },

          {
            path: ROUTES.EXPENSE,
            element: <ExpensePage />,
          },

          {
            path: ROUTES.SETTINGS,
            element: <SettingsPage />,
            children: [
              {
                index: true,
                element: <GeneralSettingsPage />,
              },
              {
                path: "meal-setting",
                element: <MealSettingManagePage />,
              },
            ],
          },

          {
            path: ROUTES.MY_PROFILE,

            element: (
              <RoleGuard
                allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]}
              />
            ),

            children: [
              {
                element: <MyProfileLayout />,

                children: [
                  {
                    index: true,
                    element: <MyProfilePage />,
                  },

                  {
                    path: "deposit-history",
                    element: <MyDepositHistoryPage />,
                  },

                  {
                    path: "meal-history",
                    element: <MyMealHistoryPage />,
                  },
                ],
              },
            ],
          },

          {
            path: ROUTES.NOTIFICATIONS,
            element: <NotificationPage />,
          },
          {
            path: ROUTES.HOME,
            element: <HomePage />,
          },
          {
            path: ROUTES.PLANS,
            element: <RoleGuard allowedRoles={[ROLES.ADMIN]} />,
            children: [
              {
                element: <PlanManagementPage />,
                children: [
                  {
                    index: true,
                    element: <PlanTable />,
                  },
                  {
                    path: ":id",
                    element: <PlanDetailsPage />,
                  },
                ],
              },
            ],
          },

          {
            path: ROUTES.FEATURE,

            element: <RoleGuard allowedRoles={[ROLES.ADMIN]} />,

            children: [
              {
                element: <FeaturePage />,

                children: [
                  {
                    index: true,
                    element: <FeatureTable />,
                  },
                ],
              },
            ],
          },
          {
            path: ROUTES.PLAN_FEATURE,

            element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

            children: [
              {
                element: <PlanFeaturePage />,

                children: [
                  {
                    index: true,
                    element: <PlanFeatureTable />,
                  },
                ],
              },
            ],
          },
          {
            path: ROUTES.PREFERENCE,
            element: <MealPreferencePage />,
          },
        ],
      },
    ],
  },

  // Global Error Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
