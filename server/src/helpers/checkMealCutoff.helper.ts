import { getMaghribTime } from "@/helpers/getPrayerTime.helper.js";
import { MealSetting } from "@/models/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { createAppTime, getAppNow } from "@/utils/timezone.util.js";

interface ICheckMealCutoffPayload {
  mealSetting: MealSetting;
  meal: "breakfast" | "lunch" | "dinner";
  date?: Date;
}

export const checkMealCutoff = ({
  mealSetting,
  meal,
  date = new Date(),
}: ICheckMealCutoffPayload): boolean => {
  const now = getAppNow();

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

  const requestDate = new Date(date);

  const cutoffHours = Math.floor(cutoffMinute / 60);
  const cutoffMinutes = cutoffMinute % 60;

  /**
   * Breakfast:
   *
   * Previous day Maghrib
   *          ↓
   * Request date Breakfast cutoff
   */
  if (meal === "breakfast") {
    const previousDay = new Date(requestDate);

    previousDay.setDate(previousDay.getDate() - 1);

    const startTime = getMaghribTime(previousDay);

    const endTime = createAppTime(requestDate, cutoffHours, cutoffMinutes);

    if (now < startTime) {
      throw new ApiError(400, "Breakfast modification has not started yet.");
    }

    if (now > endTime) {
      throw new ApiError(400, "Breakfast modification time has expired.");
    }

    return true;
  }

  /**
   * Lunch / Dinner:
   * Same day cutoff
   */
  const cutoff = createAppTime(requestDate, cutoffHours, cutoffMinutes);

  if (now > cutoff) {
    throw new ApiError(400, `${meal} modification time has expired.`);
  }

  return true;
};
