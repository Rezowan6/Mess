import { IMealSessionReq } from "../mealSession/mealSession.interface.js";

export const MealRequestStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const MEAL_REQUEST_STATUSES = Object.values(MealRequestStatus);

export type MealRequestStatus =
  (typeof MealRequestStatus)[keyof typeof MealRequestStatus];

export interface ICreateMealRequestDto {
  tenantId: number;
  mealSessionId: number;
  userId: number;
  session: IMealSessionReq
  date: Date;
  breakfast?: number;
  lunch?: number;
  dinner?: number;
  status?: MealRequestStatus;
  approvedBy?: number;
  approvedAt?: Date;
  note?: string;
}

export interface UpdateMealRequestDto {
  tenantId?: number;
  mealSessionId?: number;
  userId?: number;
  date?: Date;
  breakfast?: number;
  lunch?: number;
  dinner?: number;
  status?: MealRequestStatus;
  approvedBy?: number;
  approvedAt?: Date;
  rejectedBy?: number;
  rejectedAt?: Date;
  note?: string;
}

export interface CreateMealRequestDto {
  tenantId: number;
  userId: number;
  date: Date;
  breakfast?: number;
  lunch?: number;
  dinner?: number;
}
