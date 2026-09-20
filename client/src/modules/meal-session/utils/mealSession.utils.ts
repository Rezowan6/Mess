import { formatMonthName } from "@/shared/utils/date.utils";
import type { ICompletedMealSession } from "../types/mealSession.types";

/**
 * Example:
 * September 2026 — Session 1
 */
export const getMealSessionLabel = ({
  month,
  year,
  sessionNumber,
}: Pick<ICompletedMealSession, "month" | "year" | "sessionNumber">): string => {
  return `${formatMonthName(month).slice(0, 3)} ${year} — Session ${sessionNumber}`;
};
