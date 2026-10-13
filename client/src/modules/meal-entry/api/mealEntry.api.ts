import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type {
  ICreateMealEntryDto,
  IMealEntryListResponse,
  IMealEntryQuery,
  IMealEntrySummaryResponse,
  IMyMealApiResponse,
  IUpdateMealEntryDto,
} from "../types/mealEntry.types";

export const mealEntryApi = {
  my: async (): Promise<IMyMealApiResponse> => {
    const { data } = await API.get<IMyMealApiResponse>(
      API_ENDPOINTS.MEAL_ENTRY.MY,
    );

    return data;
  },

  getAllMembersMeal: async (
    params?: IMealEntryQuery,
  ): Promise<IMealEntryListResponse> => {
    const { data } = await API.get<IMealEntryListResponse>(
      API_ENDPOINTS.MEAL_ENTRY.LIST,
      {
        params,
      },
    );

    return data;
  },

  membersMealSummary: async (
    params?: IMealEntryQuery,
  ): Promise<IMealEntryListResponse> => {
    const { data } = await API.get<IMealEntryListResponse>(
      API_ENDPOINTS.MEAL_ENTRY.MEMBERS_MEAL_SUMMARY,
      {
        params,
      },
    );

    return data;
  },

  todayMealEntries: async (
    params?: IMealEntryQuery,
  ): Promise<IMealEntryListResponse> => {
    const { data } = await API.get<IMealEntryListResponse>(
      API_ENDPOINTS.MEAL_ENTRY.TODAY_MEALS,
      {
        params,
      },
    );

    return data;
  },

  dailySummary: async (
    params?: IMealEntryQuery,
  ): Promise<IMealEntrySummaryResponse> => {
    const { data } = await API.get<IMealEntrySummaryResponse>(
      API_ENDPOINTS.MEAL_ENTRY.DAILY_SUMMARY,
      {
        params,
      },
    );

    return data;
  },

  summary: async (
    params?: IMealEntryQuery,
  ): Promise<IMealEntrySummaryResponse> => {
    const { data } = await API.get<IMealEntrySummaryResponse>(
      API_ENDPOINTS.MEAL_ENTRY.SUMMARY,
      {
        params,
      },
    );

    return data;
  },

  memberSummary: async (
    params?: IMealEntryQuery,
  ): Promise<IMealEntrySummaryResponse> => {
    const { data } = await API.get<IMealEntrySummaryResponse>(
      API_ENDPOINTS.MEAL_ENTRY.MEMBER_SUMMARY,
      {
        params,
      },
    );

    return data;
  },

  create: async (payload: ICreateMealEntryDto) => {
    const { data } = await API.post(
      API_ENDPOINTS.MEAL_ENTRY.CREATE,
      payload,
    );
  
    return data;
  },
  
  update: async (id: number, payload: IUpdateMealEntryDto) => {
    const { data } = await API.patch(
      API_ENDPOINTS.MEAL_ENTRY.UPDATE(id),
      payload,
    );
  
    return data;
  },
  
  delete: async (id: number) => {
    const { data } = await API.delete(
      API_ENDPOINTS.MEAL_ENTRY.DELETE(id),
    );
  
    return data;
  },
};
