import { mealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";

import sequelize from "@/configs/db.js";
import { appTime } from "@/configs/time.js";

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
    /**
     * The `date` comes from the job handler.
     *
     * Important:
     * This service does NOT calculate the meal date.
     *
     * Example:
     *
     * Maghrib + 5 minutes
     *        ↓
     * Handler calculates Sep 2
     *        ↓
     * This service receives Sep 2
     *        ↓
     * Generates Sep 2 meal requests
     */

    const mealSession = await mealSessionRepository.getCurrentSession(tenantId);

    if (!mealSession) {
      console.log(
        `[MealGenerator] No current meal session found for tenant ${tenantId}`,
      );

      return {
        createdRequests: 0,
        createdEntries: 0,
      };
    }

    const mealSetting = await mealSettingRepository.findOneWithOptions({
      where: {
        tenantId,
      },
    });

    const preferences = await mealPreferenceRepository.getActivePreferences({
      tenantId,
    });

    return sequelize.transaction(async (transaction) => {
      const requests = [];

      const isAutoApproved = mealSetting?.autoApproveMealRequest ?? false;

      /**
       * Generate one meal request for each active preference.
       */
      for (const preference of preferences) {
        /**
         * Duplicate protection.
         *
         * If the same job accidentally runs twice,
         * an existing request will not be created again.
         */
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

          /**
           * IMPORTANT:
           * Use the date received from the handler.
           */
          date,

          breakfast: preference.breakfast,
          lunch: preference.lunch,
          dinner: preference.dinner,
          guestMeal: preference.guestMeal ?? 0,

          status,

          approvedAt: isAutoApproved ? appTime().toDate() : undefined,
        });
      }

      /**
       * Create meal requests.
       */
      const createdRequests = requests.length
        ? await mealRequestRepository.bulkCreate(requests, {
            transaction,
          })
        : [];

      /**
       * If auto approval is enabled,
       * immediately create Meal Entries
       * from the newly approved requests.
       */
      let createdEntries = 0;

      if (isAutoApproved && createdRequests.length) {
        const entries = await mealEntryGenerator.bulkCreateFromMealRequests(
          createdRequests,
          transaction,
        );

        /**
         * If the generator returns an array,
         * count the created entries.
         *
         * Otherwise this will safely remain 0.
         */
        createdEntries = Array.isArray(entries) ? entries.length : 0;
      }

      return {
        createdRequests: createdRequests.length,
        createdEntries,
      };
    });
  }
}

export const mealGeneratorService = new MealGeneratorService();
