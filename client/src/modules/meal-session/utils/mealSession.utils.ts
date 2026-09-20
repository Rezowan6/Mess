import type { ICompletedMealSession } from "../types/mealSession.types";

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

/** month: 1-12 (backend-এর মান) */
export const formatMonthName = (month: number): string => {
  if (!Number.isInteger(month) || month < 1 || month > 12) return "Unknown";

  // দিন ১ ও local time: timezone-এর কারণে মাস সরে যাওয়ার সুযোগ নেই
  return monthFormatter.format(new Date(2000, month - 1, 1));
};

/** "September 2026 — Session 2" */
export const getMealSessionLabel = ({
  month,
  year,
  sessionNumber,
}: Pick<ICompletedMealSession, "month" | "year" | "sessionNumber">): string =>
  `${formatMonthName(month)} ${year} — Session ${sessionNumber}`;
