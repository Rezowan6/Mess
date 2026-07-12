export interface IMemberCalculation {
  userId: number;
  name: string;

  totalMeal: number;
  deposit: number;

  memberCost: number;
  balance: number;
}

export interface IMonthlyCalculationResponse {
  mealSessionId: number;
  month: number;
  year: number;

  totalExpense: number;
  totalMeal: number;
  mealRate: number;

  members: IMemberCalculation[];
}
