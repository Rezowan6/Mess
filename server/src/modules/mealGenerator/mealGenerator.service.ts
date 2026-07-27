import { mealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";

import sequelize from "@/configs/db.js";
import { mealEntryGenerator } from "../mealEntry/mealEntry.generator.js";
import { IGenerateDailyMealRequestPayload } from "../MealPreference/mealPreference.interface.js";
import { mealPreferenceRepository } from "../MealPreference/mealPreference.repository.js";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import { mealSettingRepository } from "../mealSetting/mealSetting.repository.js";

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

    const mealSetting = await mealSettingRepository.findOneWithOptions({
      where: {
        tenantId,
      },
    });

    const preferences = await mealPreferenceRepository.getActivePreferences({
      tenantId,
      mealSessionId: mealSession.id,
    });

    return sequelize.transaction(async (transaction) => {
      const requests = [];

      const isAutoApproved = mealSetting?.autoApproveMealRequest ?? false;

      // meal preference
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

        const status = isAutoApproved
          ? MealRequestStatus.APPROVED
          : MealRequestStatus.PENDING;

        requests.push({
          tenantId,

          mealSessionId: mealSession.id,

          userId: preference.userId,

          date,

          breakfast: preference.breakfast,

          lunch: preference.lunch,

          dinner: preference.dinner,

          guestMeal: preference.guestMeal ?? 0,

          status,

          approvedAt: isAutoApproved ? new Date() : undefined,
        });
      }

      const createdRequests = requests.length
        ? await mealRequestRepository.bulkCreate(requests, {
            transaction,
          })
        : [];

      // meal entries
      if (isAutoApproved && createdRequests.length) {
        await mealEntryGenerator.bulkCreateFromMealRequests(
          createdRequests,
          transaction,
        );
      }

      return {
        createdRequests: createdRequests.length,
      };
    });
  }
}

export const mealGeneratorService = new MealGeneratorService();
