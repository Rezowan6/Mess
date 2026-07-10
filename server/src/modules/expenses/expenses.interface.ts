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

export interface UpdateExpenseDto {
  amount?: number;
  category?: string;
  description?: string;
  signature?: string;
  expensesDate?: Date;
}
