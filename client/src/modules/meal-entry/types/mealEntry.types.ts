import type { IPaginationMeta } from "@/shared/types/pagination.types";
export interface IMealEntryQuery {
  page?: number;

  limit?: number;

  search?: string;

  date?: string;
}

export interface IMyMealResponse {
  meals: IMealEntry[];
  totalMeal: number;
}

export interface IMyMealApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IMyMealResponse;
}

export interface IMealEntry {
  id: number;

  user?: {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
  };

  tenantId: number;

  mealSessionId: number;

  mealRequestId: number;

  memberId: number;

  userId: number;

  date: string;

  breakfast: number;

  lunch: number;

  dinner: number;

  guestMeal: number;

  totalBreakfast?: number;
  totalLunch?: number;
  totalDinner?: number;
  totalGuestMeal?: number;

  totalMeals?: number;
  grandTotalMeals?: number;

  createdAt: string;

  updatedAt: string;
}

export interface ICreateMealEntryDto {
  memberId: number;

  mealSessionId: number;

  mealRequestId: number;

  date: string;

  breakfast: number;

  lunch: number;

  dinner: number;

  guestMeal: number;
}

export interface IMealSummary {
  totalMeals: string;

  grandTotalMeals: string;

  totalGuestMeals: string;

  memberCount: string;
}

export interface IMealEntryListResponse {
  statusCode: number;

  success: boolean;

  message: string;

  data: IMealEntry[];

  meta: IPaginationMeta;
}

export interface IMealEntrySummaryResponse {
  statusCode: number;

  success: boolean;

  message: string;

  data: IMealSummary;
}

export interface ITodayMealEntry extends IMealEntry {
  mealRequest?: {
    id: number;
    status: string;
  };

  mealSession?: {
    id: number;
    month: number;
    year: number;
    status: string;
  };
}
