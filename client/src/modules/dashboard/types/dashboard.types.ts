export interface IDashboardStats {
  totalMeals: number;
  totalMembers: number;
  totalExpense: number;
  totalDeposit: number;
}

export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export type DashboardStatsResponse = IApiResponse<IDashboardStats>;
