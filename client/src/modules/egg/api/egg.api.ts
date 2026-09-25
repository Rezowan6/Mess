import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type { ICreateEggDto, IUpdateEggDto } from "../types/egg.types";

export const eggApi = {
  getAll: async () => {
    const { data } = await API.get(API_ENDPOINTS.EGG.GET_ALL);

    return data;
  },

  getSummary: async () => {
    const { data } = await API.get(API_ENDPOINTS.EGG.GET_SUMMARY);

    return data;
  },

  create: async (payload: ICreateEggDto) => {
    const { data } = await API.post(API_ENDPOINTS.EGG.CREATE, payload);

    return data;
  },

  update: async (id: number, payload: IUpdateEggDto) => {
    const { data } = await API.patch(API_ENDPOINTS.EGG.UPDATE(id), payload);

    return data;
  },

  delete: async (id: number) => {
    const { data } = await API.delete(API_ENDPOINTS.EGG.DELETE(id));

    return data;
  },
};
