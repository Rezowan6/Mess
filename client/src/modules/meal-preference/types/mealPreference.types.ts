export interface IMealPreference {
  id: number;

  tenantId: number;

  userId: number;

  breakfast: number;

  lunch: number;

  dinner: number;

  guestMeal: number;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface IUpsertMealPreferenceDto {
  breakfast: number;

  lunch: number;

  dinner: number;

  guestMeal?: number;
}

export interface IMealPreferenceResponse {
  data: IMealPreference | null;
}

