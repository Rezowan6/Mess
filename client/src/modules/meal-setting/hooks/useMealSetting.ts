import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { mealSettingApi } from "../api/mealSetting.api";

export const useMealSetting = () => {
  return useQuery({
    queryKey: queryKeys.mealSetting.current,

    queryFn: mealSettingApi.getCurrent,
  });
};
