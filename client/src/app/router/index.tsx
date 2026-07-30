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

import { DepositTable } from "@/modules/deposit/components/DepositTable";
import { DepositAddPage } from "@/modules/deposit/pages/DepositAddPage";
import { DepositHistoryPage } from "@/modules/deposit/pages/DepositHistoryPage";
import { DepositPage } from "@/modules/deposit/pages/DepositPage";
import { ExpensePage } from "@/modules/expense/pages/ExpensePage";
import { AcceptInvitePage } from "@/modules/invite/pages/AcceptInvitePage";
import { MealEntryPage } from "@/modules/meal-entry/pages/MealEntryPage";
import { MealHistoryPage } from "@/modules/meal-entry/pages/MealHistoryPage";
import { MembersMealSummaryPage } from "@/modules/meal-entry/pages/MembersMealSummaryPage";
import { MealPreferencePage } from "@/modules/meal-preference/pages/MealPreferencePage";
import { NotificationPage } from "@/modules/notification/pages/NotificationPage";
import { SettingsPage } from "@/modules/settings/pages/SettingsPage";
import { DashboardLayout } from "../layouts/Dashboard.layout";

export const router = createBrowserRouter([
  // Public Routes
  {
    element: <PublicRoute />,

    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
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
                ],
              },
            ],
          },

          {
            path: ROUTES.EXPENSE,
            element: <ExpensePage />,
          },

          {
            path: ROUTES.SETTINGS,
            element: <SettingsPage />,
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

  {
    path: ROUTES.INVITES_ACCEPT,
    element: <AcceptInvitePage />,
  },
]);
