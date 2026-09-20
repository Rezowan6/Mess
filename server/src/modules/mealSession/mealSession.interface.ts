export const MealSessionStatus = {
  OPEN: "open",
  CLOSED: "closed",
} as const;

export const MEAL_SESSION_STATUS = Object.values(MealSessionStatus);
export type MealSessionStatus =
  (typeof MealSessionStatus)[keyof typeof MealSessionStatus];

export interface IMealSessionReq {
  id: number;
  tenantId: number;
  month: number;
  year: number;
  status: MealSessionStatus;
}

export interface ICompletedMealSession {
  id: number;
  month: number;
  year: number;
  status: string;
  sessionNumber: number;
  openedAt: Date | null;
  closedAt: Date | null;
}
export interface CreateMealSessionPayload {
  tenantId: number;
  month: number;
  sessionNumber: number;
  year: number;
  openedBy: number;
  openedAt: Date;
}
