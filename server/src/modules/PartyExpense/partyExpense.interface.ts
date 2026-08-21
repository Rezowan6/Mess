export interface ICreatePartyExpenseDto {
  tenantId: number;
  mealSessionId: number;
  amount: number;
  description?: string | null;
  date: Date;
}