interface IUpsertDto {
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeal?: number;
}
export interface IUpsertPayload {
  tenantId: number;
  mealSessionId: number;
  userId: number;
  payload: IUpsertDto;
}

export interface IGenerateDailyMealRequestPayload {
  tenantId: number;
  date: Date;
}

export interface IGetMealPreferencesBySession {
  tenantId: number;
  mealSessionId: number;
}

export interface ICopyMealPreferencePayload {
  tenantId: number;
  previousMealSessionId: number;
  currentMealSessionId: number;
}

export interface IMealPreferenceWithUser {
  userId: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeal: number;

  user: {
    id: number;
    name: string;
  };
}
