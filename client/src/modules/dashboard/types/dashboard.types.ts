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

export interface IMealTrend {
  date: string;
  meals: string;
}

export type MealTrendResponse = IApiResponse<IMealTrend[]>;

export type DashboardStatsResponse = IApiResponse<IDashboardStats>;
