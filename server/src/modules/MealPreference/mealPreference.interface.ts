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
