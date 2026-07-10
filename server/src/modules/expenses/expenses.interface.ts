export interface CreateExpensesDto {
  tenantId: number;
  mealSessionId: number;
  amount: number;
  signature: string;
  expensesDate: Date;
  createdBy: number;
  category?: string;
  description?: string;
}
