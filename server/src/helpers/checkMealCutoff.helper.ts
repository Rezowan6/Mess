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
}: ICheckMealCutoffPayload) => {
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

  if (meal === "breakfast") {
    const requestDate = new Date(date);

    // same day maghrib
    const startTime = getMaghribTime(requestDate);

    // next day cutoff
    const cutoffHours = Math.floor(cutoffMinute / 60);
    const cutoffMinutes = cutoffMinute % 60;

    const nextDay = new Date(requestDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const endTime = createAppTime(nextDay, cutoffHours, cutoffMinutes);

    if (now < startTime) {
      throw new ApiError(400, "Breakfast modification has not started yet.");
    }

    if (now > endTime) {
      throw new ApiError(400, "Breakfast modification time has expired.");
    }

    return true;
  }

  const cutoffHours = Math.floor(cutoffMinute / 60);
  const cutoffMinutes = cutoffMinute % 60;

  const cutoff = createAppTime(date, cutoffHours, cutoffMinutes);

  if (now > cutoff) {
    throw new ApiError(400, `${meal} modification time has expired.`);
  }

  return true;
};
