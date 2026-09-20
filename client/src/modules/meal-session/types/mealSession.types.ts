export const MealSessionStatus = {
  OPEN: "open",
  CLOSED: "closed",
  DRAFT: "draft",
} as const;

export type MealSessionStatusType =
  (typeof MealSessionStatus)[keyof typeof MealSessionStatus];

export interface IMealSession {
  id: number;

  tenantId: number;

  month: number;

  year: number;

  status: MealSessionStatusType;

  openedBy: number;

  closedBy?: number;

  openedAt: string;

  closedAt?: string;
}

/** Backend-এর /completed endpoint-এর একটা item */
export interface ICompletedMealSession {
  id: number;
  month: number; // 1-12 (JavaScript Date-এর মতো 0-ভিত্তিক নয়)
  year: number;
  sessionNumber: number;
  openedAt: string | null; // ISO string
  closedAt: string | null; // ISO string
}

/** Selector-এ নির্বাচিত মান: Dashboard data এর ওপর নির্ভর করবে */
export interface IMealSessionSelection {
  month: number;
  year: number;
  mealSessionId: number;
}
