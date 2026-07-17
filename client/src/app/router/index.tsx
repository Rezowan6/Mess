import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./protected.route";
import { PublicRoute } from "./public.route";

import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { HomePage } from "@/pages/HomePage";

import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
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
            element: <RoleGuard allowedRoles={[ROLES.MANAGER, ROLES.ADMIN]} />,

            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
            ],
          },
          {
            path: ROUTES.HOME,
            element: <HomePage />,
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
