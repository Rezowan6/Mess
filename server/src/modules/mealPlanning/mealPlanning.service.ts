import { mealPreferenceRepository } from "../MealPreference/mealPreference.repository.js";

import type {
  IMealPlanningEntry,
  IMealPlanningMember,
  IMealPlanningResponse,
  IMealPlanningSummary,
} from "./mealPlanning.interface.js";

class MealPlanningService {
  private buildMealPlanningSummary(
    entries: IMealPlanningEntry[],
  ): IMealPlanningSummary {
    const summary = entries.reduce(
      (acc, entry) => {
        acc.breakfast += Number(entry.breakfast);
        acc.lunch += Number(entry.lunch);
        acc.dinner += Number(entry.dinner);
        acc.guestMeal += Number(entry.guestMeal);

        return acc;
      },
      {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        guestMeal: 0,
        totalMeals: 0,
      },
    );

    summary.totalMeals =
      summary.breakfast +
      summary.lunch +
      summary.dinner +
      summary.guestMeal;

    return summary;
  }

  private buildMealMemberList(
    entries: IMealPlanningEntry[],
    meal: "breakfast" | "lunch" | "dinner",
  ): IMealPlanningMember[] {
    return entries
      .filter((entry) => Number(entry[meal]) > 0)
      .map((entry) => ({
        userId: entry.userId,
        memberName: entry.user?.name ?? "Unknown Member",
        meal: Number(entry[meal]),
      }));
  }

  async getDailyMealPlanning(
    tenantId: number,
    mealSessionId: number,
    date: string,
  ): Promise<IMealPlanningResponse> {
    const preferences =
      await mealPreferenceRepository.getActivePreferences({
        tenantId,
        mealSessionId,
      });

    const entries: IMealPlanningEntry[] = preferences.map((preference) => ({
      userId: preference.userId,
      breakfast: Number(preference.breakfast),
      lunch: Number(preference.lunch),
      dinner: Number(preference.dinner),
      guestMeal: Number(preference.guestMeal),
      user: preference.user,
    }));

    const summary = this.buildMealPlanningSummary(entries);

    const breakfast = this.buildMealMemberList(entries, "breakfast");

    const lunch = this.buildMealMemberList(entries, "lunch");

    const dinner = this.buildMealMemberList(entries, "dinner");

    return {
      summary,
      breakfast,
      lunch,
      dinner,
    };
  }
}

export const mealPlanningService = new MealPlanningService();