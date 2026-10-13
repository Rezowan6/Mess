import { ISessionScope } from "@/types/scope.interface.js";

export interface CreateExpensesDto extends ISessionScope {
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
