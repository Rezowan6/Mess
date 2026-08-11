// mealPlanning.types.ts

export interface IMealPlanningQuery {
  mealSessionId: number;
  date: string;
}

export interface IMealPlanningMember {
  userId: number;
  memberName: string;
  meal: number;
}

export interface IMealPlanningSummary {
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeal: number;
  totalMeals: number;
}

export interface IMealPlanningResponse {
  data: {
    summary: IMealPlanningSummary;
    breakfast: IMealPlanningMember[];
    lunch: IMealPlanningMember[];
    dinner: IMealPlanningMember[];
  };
}
