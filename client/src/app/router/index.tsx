import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./protected.route";
import { PublicRoute } from "./public.route";

import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { ForbiddenPage } from "@/pages/errors/ForbiddenPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";

import { ROUTES } from "@/shared/constants/routes";

import { RegisterPage } from "@/modules/auth/pages/RegisterPage";
import { VerifyEmailPage } from "@/modules/auth/pages/VerifyEmailPage";
import { AcceptInvitePage } from "@/modules/invite/pages/AcceptInvitePage";
import { LandingLayout } from "@/modules/landing/layouts/LandingLayout";
import { LandingPage } from "@/modules/landing/pages/LandingPage";
import { DashboardLayout } from "../layouts/Dashboard.layout";
import { dashboardRoutes } from "./dashboard.routes";

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

  {
    path: ROUTES.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: ROUTES.INVITES_ACCEPT,
    element: <AcceptInvitePage />,
  },
  {
    path: ROUTES.FORBIDDEN,
    element: <ForbiddenPage />,
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: dashboardRoutes,
      },
    ],
  },

  // Global Error Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
