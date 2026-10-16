import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  ICreatePaymentMethodDto,
  IPaymentMethodListResponse,
  IUpdatePaymentMethodDto,
} from "../types/paymentMethod.types";

export const paymentMethodApi = {
  getAll: async (): Promise<IPaymentMethodListResponse> => {
    const { data } = await API.get<IPaymentMethodListResponse>(
      API_ENDPOINTS.PAYMENT_METHOD.GET_ALL,
    );

    return data;
  },

  create: async (payload: ICreatePaymentMethodDto) => {
    const { data } = await API.post(
      API_ENDPOINTS.PAYMENT_METHOD.CREATE,
      payload,
    );

    return data;
  },

  update: async (id: number, payload: IUpdatePaymentMethodDto) => {
    const { data } = await API.patch(
      API_ENDPOINTS.PAYMENT_METHOD.UPDATE(id),
      payload,
    );
    return data;
  },

  delete: async (id: number) => {
    const { data } = await API.delete(API_ENDPOINTS.PAYMENT_METHOD.DELETE(id));
    return data;
  },
};
