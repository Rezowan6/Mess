import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { tokenStorage } from "@/shared/utils/token";
import { API_ENDPOINTS } from "../constants/api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { HEADERS } from "../constants/headers";
import { forceLogout } from "../utils/forceLogout";

// Production Axios Instance
const apiUrl = "/api/v1";

export const API = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.get();

  const currentTenant = useTenantStore.getState().currentTenant;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

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

// Refresh Response Type
interface RefreshResponse {
  accessToken: string;
}
// Response Interceptor
API.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post<RefreshResponse>(
          `${apiUrl}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          {
            withCredentials: true,
          },
        );

        tokenStorage.set(data.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${data.accessToken}`,
          );
        }

        return API(originalRequest);
      } catch {
        forceLogout();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
