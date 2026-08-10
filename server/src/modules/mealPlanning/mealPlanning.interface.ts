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
  summary: IMealPlanningSummary;

  breakfast: IMealPlanningMember[];

  lunch: IMealPlanningMember[];

  dinner: IMealPlanningMember[];
}

export interface IMealPlanningEntry {
  userId: number;

  breakfast: number;

  lunch: number;

  dinner: number;

  guestMeal: number;

  user: {
    id: number;
    name: string;
  };
}

export interface IMealPlanningQuery {
  date: string;
}
