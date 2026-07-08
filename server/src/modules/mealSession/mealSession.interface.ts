export const MealSessionStatus = {
  OPEN: "open",
  CLOSED: "closed",
} as const;

export const MEAL_SESSION_STATUS = Object.values(MealSessionStatus);


export type MealSessionStatus = (typeof MealSessionStatus)[keyof typeof MealSessionStatus];