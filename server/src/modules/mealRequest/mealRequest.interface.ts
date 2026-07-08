export const MealRequestStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const MEAL_REQUEST_STATUSES =
  Object.values(MealRequestStatus);

export type MealRequestStatus =
  (typeof MealRequestStatus)[keyof typeof MealRequestStatus];