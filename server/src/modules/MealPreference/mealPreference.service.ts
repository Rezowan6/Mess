import { IUpsertPayload } from "./mealPreference.interface.js";
import { mealPreferenceRepository } from "./mealPreference.repository.js";

class MealPreferenceService {
  async upsert({ tenantId, userId, payload }: IUpsertPayload) {
    const { breakfast, lunch, dinner, guestMeal } = payload;

    const existingPreference =
      await mealPreferenceRepository.findOneWithOptions({
        where: {
          tenantId,
          userId,
        },
      });

    if (!existingPreference) {
      return await mealPreferenceRepository.create({
        tenantId,
        userId,

        breakfast,
        lunch,
        dinner,
        guestMeal: guestMeal ?? 0,

        isActive: true,
      });
    }

    return await mealPreferenceRepository.update(
      { id: existingPreference.id },
      {
        breakfast,
        lunch,
        dinner,
        guestMeal: guestMeal ?? 0,
      },
    );
  }

  async getMyPreference({
    tenantId,
    userId,
  }: {
    tenantId: number;
    userId: number;
  }) {
    return await mealPreferenceRepository.getMyPreference({
      tenantId,
      userId,
    });
  }
}

export const mealPreferenceService = new MealPreferenceService();
