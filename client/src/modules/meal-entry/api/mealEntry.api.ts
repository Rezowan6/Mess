import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type {
  IMealEntryListResponse,
  IMealEntryQuery,
  IMealEntrySummaryResponse,
} from "../types/mealEntry.types";

export const mealEntryApi = {
  my: async (params?: IMealEntryQuery): Promise<IMealEntryListResponse> => {
    const { data } = await API.get<IMealEntryListResponse>(
      API_ENDPOINTS.MEAL_ENTRY.MY,
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

  daily: async (params?: IMealEntryQuery): Promise<IMealEntryListResponse> => {
    const { data } = await API.get<IMealEntryListResponse>(
      API_ENDPOINTS.MEAL_ENTRY.DAILY,
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
};
