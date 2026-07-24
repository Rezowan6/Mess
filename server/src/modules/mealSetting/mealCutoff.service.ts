import { MealSetting } from "./mealSetting.model.js";

class MealCutoffService {
  private isBeforeCutoff(
    mealDate: Date,
    cutoffMinute: number,
    previousDay: boolean,
    now: Date = new Date(),
  ): boolean {
    const cutoff = new Date(mealDate);

    if (previousDay) {
      cutoff.setDate(cutoff.getDate() - 1);
    }

    cutoff.setHours(0, 0, 0, 0);

    cutoff.setMinutes(cutoffMinute);

    return now <= cutoff;
  }

  canTakeBreakfast(
    setting: MealSetting,
    mealDate: Date,
    now: Date = new Date(),
  ): boolean {
    return this.isBeforeCutoff(
      mealDate,
      setting.breakfastCutoffMinute,
      setting.breakfastPreviousDay,
      now,
    );
  }

  canTakeLunch(
    setting: MealSetting,
    mealDate: Date,
    now: Date = new Date(),
  ): boolean {
    return this.isBeforeCutoff(mealDate, setting.lunchCutoffMinute, false, now);
  }

  canTakeDinner(
    setting: MealSetting,
    mealDate: Date,
    now: Date = new Date(),
  ): boolean {
    return this.isBeforeCutoff(
      mealDate,
      setting.dinnerCutoffMinute,
      false,
      now,
    );
  }
}

export const mealCutoffService = new MealCutoffService();
