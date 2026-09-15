import { appTime } from "@/configs/time.js";
import { getTodayMaghribTime } from "@/jobs/mealRequest/mealRequest.time.js";
import { APP_TIMEZONE } from "./timezone.util.js";

/**
 * Returns the meal date based on Maghrib.
 *
 * Business rule:
 *
 * Before Maghrib
 *      ↓
 * Today's meal
 *
 * After Maghrib
 *      ↓
 * Tomorrow's meal
 */
export const getCurrentMealDate = (): Date => {
  const now = appTime();
  const maghrib = appTime(getTodayMaghribTime());


  // Before today's Maghrib
  // → Today's meal date
  if (now.isBefore(maghrib)) {
    return now.startOf("day").toDate();
  }

  // After Maghrib
  // → Tomorrow's meal date
  return now.add(1, "day").startOf("day").toDate();
};
