import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { tokenStorage } from "@/shared/utils/token";
import { API_ENDPOINTS } from "../constants/api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { env } from "../config/env";
import { HEADERS } from "../constants/headers";
import { forceLogout } from "../utils/forceLogout";

// ======================================================
// Types
// ======================================================

interface RefreshResponse {
  accessToken: string;
}

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// ======================================================
// Axios Instance
// ======================================================

export const API = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================================
// Request Interceptor
// ======================================================

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // ----------------------------------------------
  // Offline protection
  // ----------------------------------------------

  if (!navigator.onLine) {
    return Promise.reject(
      new axios.AxiosError(
        "You are offline. Please check your internet connection.",
        "ERR_NETWORK",
      ),
    );
  }

  // ----------------------------------------------
  // Access Token
  // ----------------------------------------------

  const token = tokenStorage.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ----------------------------------------------
  // Current Tenant
  // ----------------------------------------------

  const currentTenant = useTenantStore.getState().currentTenant;

  // ----------------------------------------------
  // Routes that don't require Tenant ID
  // ----------------------------------------------

  const skipTenantHeaderRoutes = [
    API_ENDPOINTS.AUTH.LOGIN,
    API_ENDPOINTS.AUTH.REFRESH,
    API_ENDPOINTS.AUTH.ME,
    API_ENDPOINTS.INVITE.ACCEPT,
  ];

  const shouldSkipTenant = skipTenantHeaderRoutes.some((route) =>
    config.url?.includes(route),
  );

  if (currentTenant && !shouldSkipTenant) {
    config.headers[HEADERS.TENANT_ID] = currentTenant.tenantId.toString();
  }

  return config;
});

// ======================================================
// Response Interceptor
// ======================================================

API.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    // ==================================================
    // Network Error
    // ==================================================

    if (!error.response) {
      return Promise.reject(error);
    }

    // ==================================================
    // Unauthorized
    // ==================================================

    if (
      error.response.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ==================================================
    // Refresh Access Token
    // ==================================================

    try {
      const { data } = await axios.post<RefreshResponse>(
        `${env.apiUrl}${API_ENDPOINTS.AUTH.REFRESH}`,
        {},
        {
          withCredentials: true,
        },
      );

      // Save new access token
      tokenStorage.set(data.accessToken);

      // Update original request
      originalRequest.headers.set(
        "Authorization",
        `Bearer ${data.accessToken}`,
      );

      // Retry original request
      return API(originalRequest);
    } catch (refreshError) {
      const refreshAxiosError = refreshError as AxiosError;

      // ==================================================
      // Refresh Network Error
      // ==================================================

      if (!refreshAxiosError.response) {
        return Promise.reject(refreshError);
      }

      // ==================================================
      // Refresh Token Invalid
      // ==================================================

      if (
        refreshAxiosError.response.status === 401 ||
        refreshAxiosError.response.status === 403
      ) {
        forceLogout();
      }

      return Promise.reject(refreshError);
    }
  },
);
