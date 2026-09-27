import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  ICreateSoldProductDto,
  IUpdateSoldProductDto,
} from "../types/soldProduct.types";

export const soldProductApi = {
  get: async () => {
    const { data } = await API.get(API_ENDPOINTS.SOLD_PRODUCT.GET);

    return data;
  },

  create: async (payload: ICreateSoldProductDto) => {
    const { data } = await API.post(API_ENDPOINTS.SOLD_PRODUCT.CREATE, payload);

    return data;
  },

  update: async (payload: IUpdateSoldProductDto) => {
    const { data } = await API.patch(
      API_ENDPOINTS.SOLD_PRODUCT.UPDATE,
      payload,
    );

    return data;
  },

  delete: async () => {
    const { data } = await API.delete(API_ENDPOINTS.SOLD_PRODUCT.DELETE);

    return data;
  },
};
