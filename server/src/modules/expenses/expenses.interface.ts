export interface CreateExpensesDto {
  tenantId: number;
  mealSessionId: number;
  amount: number;
  signature: string;
  expenseDate: Date;
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
