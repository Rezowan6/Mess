export interface IMealSetting {
  id: number;

  tenantId: number;

  defaultBreakfastMeal: number;
  defaultLunchMeal: number;
  defaultDinnerMeal: number;
  
  maxMealPerRequest: number;

  breakfastCutoffMinute: number;

  breakfastPreviousDay: boolean;

  lunchCutoffMinute: number;

  dinnerCutoffMinute: number;

  allowGuestMeal: boolean;

  autoApproveMealRequest: boolean;

  timezone: string;

  createdAt: string;

  updatedAt: string;
}

export interface IMealSettingResponse {
  statusCode: number;

  success: boolean;

  message: string;

  data: IMealSetting;
}
