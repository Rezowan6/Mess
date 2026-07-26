import { mealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";

import sequelize from "@/configs/db.js";
import { IGenerateDailyMealRequestPayload } from "../MealPreference/mealPreference.interface.js";
import { mealPreferenceRepository } from "../MealPreference/mealPreference.repository.js";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";

class MealGeneratorService {
  async generateDailyMealRequests({
    tenantId,
    date,
  }: IGenerateDailyMealRequestPayload) {
    const mealSession = await mealSessionRepository.getCurrentSession(tenantId);
    if (!mealSession) {
      return {
        createdCount: 0,
      };
    }

    const preferences =
      await mealPreferenceRepository.getActivePreferences(tenantId);

    return sequelize.transaction(async (transaction) => {
      const requests = [];

      for (const preference of preferences) {
        const exists = await mealRequestRepository.existsByDate({
          tenantId,
          mealSessionId: mealSession.id,
          userId: preference.userId,
          date,
        });

        if (exists) {
          continue;
        }

        requests.push({
          tenantId,

          mealSessionId: mealSession.id,

          userId: preference.userId,

          date,

          breakfast: preference.breakfast,

          lunch: preference.lunch,

          dinner: preference.dinner,

          guestMeal: preference.guestMeal ?? 0,

          status: MealRequestStatus.PENDING,
        });
      }

      if (requests.length) {
        await mealRequestRepository.bulkCreate(requests, {
          transaction,
        });
      }

      return {
        createdCount: requests.length,
      };
    });
  }
}

export const mealGeneratorService = new MealGeneratorService();
