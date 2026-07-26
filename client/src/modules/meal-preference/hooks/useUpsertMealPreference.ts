import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { mealPreferenceApi } from "../api/mealPreference.api";

import type { IUpsertMealPreferenceDto } from "../types/mealPreference.types";

export const useUpsertMealPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpsertMealPreferenceDto) =>
      mealPreferenceApi.upsert(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPreference.myPreference,
      });
    },
  });
};
