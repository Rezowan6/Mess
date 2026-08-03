import { getMaghribTime } from "@/helpers/getPrayerTime.helper.js";
import { MealSetting } from "@/models/index.js";
import { ApiError } from "@/utils/ApiError.js";

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
  const now = new Date();

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
    const endTime = new Date(requestDate);

    endTime.setDate(endTime.getDate() + 1);

    const hours = Math.floor(cutoffMinute / 60);
    const minutes = cutoffMinute % 60;

    endTime.setHours(hours, minutes, 0, 0);

    if (now < startTime) {
      throw new ApiError(400, "Breakfast modification has not started yet.");
    }

    if (now > endTime) {
      throw new ApiError(400, "Breakfast modification time has expired.");
    }

    return true;
  }

  const cutoff = new Date(date);

  const hours = Math.floor(cutoffMinute / 60);

  const minutes = cutoffMinute % 60;

  cutoff.setHours(hours, minutes, 0, 0);

  if (now > cutoff) {
    throw new ApiError(400, `${meal} modification time has expired.`);
  }

  return true;
};
