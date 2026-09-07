import { appTime } from "@/configs/time.js";
import { getMaghribTime } from "@/helpers/getPrayerTime.helper.js";
import { MealSetting } from "@/models/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { getCurrentMealDate } from "@/utils/mealDate.js";

interface ICheckMealCutoffPayload {
  mealSetting: MealSetting;
  meal: "breakfast" | "lunch" | "dinner";
  date?: Date;
}

export const checkMealCutoff = ({
  mealSetting,
  meal,
  date = getCurrentMealDate(),
}: ICheckMealCutoffPayload): boolean => {
  const now = appTime();
  const requestDate = appTime(date);

  let cutoffMinute: number;

  switch (meal) {
    case "breakfast":
      cutoffMinute = mealSetting.breakfastCutoffMinute;
      break;

    case "lunch":
      cutoffMinute = mealSetting.lunchCutoffMinute;
      break;

    case "dinner":
      cutoffMinute = mealSetting.dinnerCutoffMinute;
      break;

    default:
      throw new ApiError(400, "Invalid meal type");
  }

  const cutoffHours = Math.floor(cutoffMinute / 60);
  const cutoffMinutes = cutoffMinute % 60;

  /**
   * ============================================
   * BREAKFAST
   * ============================================
   *
   * Previous day Maghrib
   *          ↓
   * Breakfast cutoff
   *
   * Example:
   *
   * Sep 7 Maghrib
   *       ↓
   * Sep 8 Breakfast cutoff
   */

  if (meal === "breakfast") {
    const previousDay = requestDate.subtract(1, "day");

    const startTime = appTime(getMaghribTime(previousDay.toDate()));

    const endTime = requestDate
      .hour(cutoffHours)
      .minute(cutoffMinutes)
      .second(0)
      .millisecond(0);

    if (now.isBefore(startTime)) {
      throw new ApiError(400, "Breakfast modification has not started yet.");
    }

    if (now.isAfter(endTime)) {
      throw new ApiError(400, "Breakfast modification time has expired.");
    }

    return true;
  }

  /**
   * ============================================
   * LUNCH / DINNER
   * ============================================
   *
   * Same meal date cutoff.
   */

  const cutoff = requestDate
    .hour(cutoffHours)
    .minute(cutoffMinutes)
    .second(0)
    .millisecond(0);

  if (now.isAfter(cutoff)) {
    throw new ApiError(400, `${meal} modification time has expired.`);
  }

  return true;
};
