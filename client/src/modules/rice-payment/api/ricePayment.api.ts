import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type {
  ICreateRicePayment,
  IRicePayment,
  IUpdateRicePayment,
} from "../types/ricePayment.types";

export const ricePaymentApi = {
  getAll: async (riceId: number): Promise<ApiResponse<IRicePayment[]>> => {
    const { data } = await API.get<ApiResponse<IRicePayment[]>>(
      API_ENDPOINTS.RICE_PAYMENT.LIST(riceId),
    );

    return data;
  },

  getById: async (
    riceId: number,
    id: number,
  ): Promise<ApiResponse<IRicePayment>> => {
    const { data } = await API.get<ApiResponse<IRicePayment>>(
      API_ENDPOINTS.RICE_PAYMENT.BY_ID(riceId, id),
    );

    return data;
  },

  getTotalPaid: async (riceId: number): Promise<ApiResponse<number>> => {
    const { data } = await API.get<ApiResponse<number>>(
      API_ENDPOINTS.RICE_PAYMENT.TOTAL_PAID(riceId),
    );

    return data;
  },

  getRemainingDue: async (riceId: number): Promise<ApiResponse<number>> => {
    const { data } = await API.get<ApiResponse<number>>(
      API_ENDPOINTS.RICE_PAYMENT.DUE(riceId),
    );

    return data;
  },

  create: async (payload: ICreateRicePayment): Promise<ApiResponse> => {
    const { data } = await API.post<ApiResponse>(
      API_ENDPOINTS.RICE_PAYMENT.CREATE,
      payload,
    );

    return data;
  },

  update: async (
    riceId: number,
    id: number,
    payload: IUpdateRicePayment,
  ): Promise<ApiResponse> => {
    const { data } = await API.patch<ApiResponse>(
      API_ENDPOINTS.RICE_PAYMENT.UPDATE(riceId, id),
      payload,
    );

    return data;
  },

  delete: async (riceId: number, id: number): Promise<ApiResponse> => {
    const { data } = await API.delete<ApiResponse>(
      API_ENDPOINTS.RICE_PAYMENT.DELETE(riceId, id),
    );

    return data;
  },
};
