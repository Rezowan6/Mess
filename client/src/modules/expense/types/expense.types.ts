import type { IPaginationMeta } from "@/shared/types/pagination.types";
export type IExpenseType = "party" | "egg" | "rice";
export interface IExpense {
  id: number;

  tenantId: number;

  mealSessionId: number;

  amount: number;

  category?: string | null;

  description?: string | null;

  signature: string;

  expenseDate: string;

  createdBy: number;

  createdAt: string;

  updatedAt: string;
}

export interface ICreateExpenseDto {
  amount: number;

  signature: string;

  expenseDate?: string;

  category?: string;

  description?: string;
}

export interface IUpdateExpenseDto {
  amount: number;

  signature: string;

  category?: string;

  description?: string;
}

export interface IExpenseQuery {
  page?: number;

  limit?: number;

  search?: string;

  category?: string;

  mealSessionId?: number;
}

export interface IExpenseListResponse {
  statusCode: number;

  success: boolean;

  message: string;

  data: IExpense[];

  meta: IPaginationMeta;
}
