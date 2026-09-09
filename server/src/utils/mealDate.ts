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


  console.log({
    serverTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    now: now.format("YYYY-MM-DD HH:mm:ss"),
    maghrib: maghrib.format("YYYY-MM-DD HH:mm:ss"),
    isBeforeMaghrib: now.isBefore(maghrib),
    mealDate: now
      .add(now.isBefore(maghrib) ? 0 : 1, "day")
      .format("YYYY-MM-DD"),
  });

  // Before today's Maghrib
  // → Today's meal date
  if (now.isBefore(maghrib)) {
    return now.startOf("day").toDate();
  }

  // After Maghrib
  // → Tomorrow's meal date
  return now.add(1, "day").startOf("day").toDate();
};
