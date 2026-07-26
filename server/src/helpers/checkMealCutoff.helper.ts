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

  /**
   * Current timezone handle
   * পরে চাইলে dayjs timezone add করতে পারি
   */

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

  const cutoff = new Date(date);

  /**
   * breakfast previous day হলে
   */

  if (meal === "breakfast" && mealSetting.breakfastPreviousDay) {
    cutoff.setDate(cutoff.getDate() - 1);
  }

  const hours = Math.floor(cutoffMinute / 60);

  const minutes = cutoffMinute % 60;

  cutoff.setHours(hours, minutes, 0, 0);

  if (now > cutoff) {
    throw new ApiError(400, `${meal} cutoff time exceeded`);
  }

  return true;
};
