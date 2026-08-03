export interface IProfilePayload {
  tenantId: number;
  userId: number;
  mealSessionId: number;
}

export interface IMyMealSummary {
  totalMeal: number;
  breakfast: number;
  lunch: number;
  dinner: number;
}
export interface IMealSummary {
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
}
