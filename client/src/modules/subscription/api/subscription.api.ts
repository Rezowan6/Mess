import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { ISubscription } from "../types/subscription.types";

export const subscriptionApi = {
  create: async (payload: Partial<ISubscription>): Promise<ApiResponse<ISubscription>> => {
    const { data } = await API.post<ApiResponse<ISubscription>>(
      API_ENDPOINTS.SUBSCRIPTION.CREATE,
      payload,
    );

    return data;
  },

  getCurrent: async (): Promise<ApiResponse<ISubscription>> => {
    const { data } = await API.get<ApiResponse<ISubscription>>(
      API_ENDPOINTS.SUBSCRIPTION.CURRENT,
    );

    return data;
  },

  getTenantSubscriptions: async (): Promise<ApiResponse<ISubscription[]>> => {
    const { data } = await API.get<ApiResponse<ISubscription[]>>(
      API_ENDPOINTS.SUBSCRIPTION.MY_SUBSCRIPTIONS,
    );

    return data;
  },

  getById: async (id: number): Promise<ApiResponse<ISubscription>> => {
    const { data } = await API.get<ApiResponse<ISubscription>>(
      API_ENDPOINTS.SUBSCRIPTION.BY_ID(id),
    );

    return data;
  },

  activate: async (id: number): Promise<ApiResponse<ISubscription>> => {
    const { data } = await API.patch<ApiResponse<ISubscription>>(
      API_ENDPOINTS.SUBSCRIPTION.ACTIVATE(id),
    );

    return data;
  },

  cancel: async (id: number): Promise<ApiResponse<ISubscription>> => {
    const { data } = await API.patch<ApiResponse<ISubscription>>(
      API_ENDPOINTS.SUBSCRIPTION.CANCEL(id),
    );

    return data;
  },
};
