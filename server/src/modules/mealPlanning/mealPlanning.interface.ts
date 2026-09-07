import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";

export interface IMealPlanningMember {
  userId: number;
  
  date: Date;
  status: MealRequestStatus;
  createdAt: Date;

  memberName: string;
  meal: number;
  avatar?: string | null;
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

  guestMeal: IMealPlanningMember[];
}

export interface IMealPlanningEntry {
  userId: number;

  date: Date;
  status: MealRequestStatus;
  createdAt: Date;

  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeal: number;

  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

export interface IMealPlanningQuery {
  date: string;
}

export type MealPlanningMeal = "breakfast" | "lunch" | "dinner";

export interface IRejectMealPayload {
  tenantId: number;
  userId: number;
  managerId: number;
  meal: MealPlanningMeal;
}
