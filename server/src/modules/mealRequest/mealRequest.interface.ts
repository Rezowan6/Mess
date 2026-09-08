export const MealRequestStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const MEAL_REQUEST_STATUSES = Object.values(MealRequestStatus);

export type MealRequestStatus =
  (typeof MealRequestStatus)[keyof typeof MealRequestStatus];

interface MealRequest {
  breakfast?: number;
  lunch?: number;
  dinner?: number;
}
export interface ICreateMealRequestDbDto extends MealRequest {
  tenantId: number;
  mealSessionId: number;
  userId: number;

  date: Date;
  status?: MealRequestStatus;
}

export interface UpdateMealRequestDto extends MealRequest {
  tenantId?: number;
  userId?: number;
  date?: Date;
  status?: MealRequestStatus;
  approvedBy?: number;
  approvedAt?: Date;
  rejectedBy?: number;
  rejectedAt?: Date;
  note?: string;
}

export interface ICreateMealRequestDto extends MealRequest {
  fromDate: Date;
  toDate: Date;
}

export interface ICreateMealRequestDto extends MealRequest {
  userId: number;
}
export interface ICreateMealRequestByDateDto extends MealRequest {
  tenantId: number;
  userId: number;
  mealSessionId: number;
  date: Date;
}

export interface IRejectReq {
  tenantId: number;
  mealSessionId: number;
}
