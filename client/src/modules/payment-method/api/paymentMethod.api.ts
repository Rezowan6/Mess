import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  ICreatePaymentMethodDto,
  IPaymentMethodListResponse,
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
};
