export interface ICreateMealSettingDto {
  tenantId: number;

  defaultBreakfastMeal: number;
  defaultLunchMeal: number;
  defaultDinnerMeal: number;
  
  maxMealPerRequest: number;

  breakfastCutoffMinute?: number;
  breakfastPreviousDay?: boolean;

  lunchCutoffMinute?: number;

  dinnerCutoffMinute?: number;

  allowGuestMeal?: boolean;

  autoApproveMealRequest?: boolean;

  timezone?: string;
}

export interface IUpdateMealSettingDto {
  breakfastCutoffMinute?: number;
  breakfastPreviousDay?: boolean;

  lunchCutoffMinute?: number;

  dinnerCutoffMinute?: number;

  allowGuestMeal?: boolean;

  autoApproveMealRequest?: boolean;

  timezone?: string;
}

export interface IMealSetting {
  id: number;

  tenantId: number;

  breakfastCutoffMinute: number;
  breakfastPreviousDay: boolean;

  lunchCutoffMinute: number;

  dinnerCutoffMinute: number;

  allowGuestMeal: boolean;

  autoApproveMealRequest: boolean;

  timezone: string;

  createdAt: Date;
  updatedAt: Date;
}
