import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  ICreateEggRateDto,
  IUpdateEggRateDto,
} from "../types/eggRate.types";

export const eggRateApi = {
  get: async () => {
    const { data } = await API.get(API_ENDPOINTS.EGG_RATE.GET);

    return data;
  },

  create: async (payload: ICreateEggRateDto) => {
    const { data } = await API.post(
      API_ENDPOINTS.EGG_RATE.CREATE,
      payload,
    );

    return data;
  },

  update: async (payload: IUpdateEggRateDto) => {
    const { data } = await API.patch(
      API_ENDPOINTS.EGG_RATE.UPDATE,
      payload,
    );

    return data;
  },

  delete: async () => {
    const { data } = await API.delete(
      API_ENDPOINTS.EGG_RATE.DELETE,
    );

    return data;
  },
};
