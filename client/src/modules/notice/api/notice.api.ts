import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  ICreateNoticeDto,
  INoticeListResponse,
  INoticeQuery,
  IUpdateNoticeDto,
} from "../types/notice.types";

export const noticeApi = {
  getAll: async (params?: INoticeQuery): Promise<INoticeListResponse> => {
    const { data } = await API.get<INoticeListResponse>(
      API_ENDPOINTS.NOTICE.LIST,
      { params },
    );

    return data;
  },

  getById: async (id: number) => {
    const { data } = await API.get(API_ENDPOINTS.NOTICE.BY_ID(id));

    return data;
  },

  create: async (payload: ICreateNoticeDto) => {
    const { data } = await API.post(
      API_ENDPOINTS.NOTICE.CREATE,
      payload,
    );

    return data;
  },

  update: async (id: number, payload: IUpdateNoticeDto) => {
    const { data } = await API.patch(
      API_ENDPOINTS.NOTICE.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number) => {
    const { data } = await API.delete(API_ENDPOINTS.NOTICE.DELETE(id));

    return data;
  },
};