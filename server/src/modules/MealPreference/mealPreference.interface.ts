interface IUpsertDto {
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeal?: number;
}
export interface IUpsertPayload {
  tenantId: number;
  userId: number;
  payload: IUpsertDto;
}

export interface IGenerateDailyMealRequestPayload {
  tenantId: number;
  date: Date;
}
