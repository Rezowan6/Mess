import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";

import type { IPayment } from "../types/payment.types";

export const paymentApi = {
  create: async (
    payload: Partial<IPayment>,
  ): Promise<ApiResponse<IPayment>> => {
    const { data } = await API.post<ApiResponse<IPayment>>(
      API_ENDPOINTS.PAYMENT.CREATE,
      payload,
    );

    return data;
  },

  getAll: async (): Promise<ApiResponse<IPayment[]>> => {
    const { data } = await API.get<ApiResponse<IPayment[]>>(
      API_ENDPOINTS.PAYMENT.LIST,
    );

    return data;
  },

  getById: async (id: number): Promise<ApiResponse<IPayment>> => {
    const { data } = await API.get<ApiResponse<IPayment>>(
      API_ENDPOINTS.PAYMENT.BY_ID(id),
    );

    return data;
  },

  getBySubscriptionId: async (
    subscriptionId: number,
  ): Promise<ApiResponse<IPayment[]>> => {
    const { data } = await API.get<ApiResponse<IPayment[]>>(
      API_ENDPOINTS.PAYMENT.BY_SUBSCRIPTION_ID(subscriptionId),
    );

    return data;
  },
};
