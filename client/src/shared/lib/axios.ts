import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { env } from "@/shared/config/env";
import { tokenStorage } from "@/shared/utils/token";
import { API_ENDPOINTS } from "../constants/api";

import { forceLogout } from "../utils/forceLogout";

// Production Axios Instance
export const API = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
          `${env.apiUrl}${API_ENDPOINTS.AUTH.REFRESH}`,
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
