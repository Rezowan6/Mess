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
