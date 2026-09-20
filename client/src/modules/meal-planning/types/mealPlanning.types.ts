// mealPlanning.types.ts
export type IMealType = "breakfast" | "lunch" | "dinner" | "guest";
export interface IMealPlanningQuery {
  mealSessionId: number;
  date: string;
}

export interface IMealPlanningMember {
  userId: number;
  status: string;
  date: string;
  updatedAt: string;

  memberName: string;
  meal: number;
  avatar: string;
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
    guest: IMealPlanningMember[];
  };
}
