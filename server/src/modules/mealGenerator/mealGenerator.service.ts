import { mealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";

import sequelize from "@/configs/db.js";
import { appTime } from "@/configs/time.js";

import { mealEntryGenerator } from "../mealEntry/mealEntry.generator.js";
import { IGenerateDailyMealRequestPayload } from "../MealPreference/mealPreference.interface.js";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";

class MealGeneratorService {
  async generateDailyMealRequests({
    tenantId,
    date,
  }: IGenerateDailyMealRequestPayload) {
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

    return sequelize.transaction(async (transaction) => {
      const pendingRequests = await mealRequestRepository.findPendingByDate({
        tenantId,
        mealSessionId: mealSession.id,
        date,
        transaction,
      });

      if (!pendingRequests.length) {
        console.log(
          `[MealGenerator] No pending meal requests found for tenant ${tenantId}, date ${appTime(date).format("YYYY-MM-DD")}`,
        );

        return {
          createdRequests: 0,
          createdEntries: 0,
        };
      }

      /**
       * Create Meal Entries from pending requests.
       *
       * If this fails, the transaction will rollback.
       * Meal Requests will remain PENDING.
       */
      const entries = await mealEntryGenerator.bulkCreateFromMealRequests(
        pendingRequests,
        transaction,
      );

      const createdEntries = Array.isArray(entries) ? entries.length : 0;

      /**
       * Only approve meal requests after Meal Entries
       * have been successfully created.
       */
      if (createdEntries > 0) {
        const mealRequestIds = pendingRequests.map((request) => request.id);

        await mealRequestRepository.updateByIds(
          mealRequestIds,
          {
            status: MealRequestStatus.APPROVED,
            approvedAt: appTime().toDate(),
          },

          transaction,
        );
      }

      return {
        createdEntries,
      };
    });
  }
}

export const mealGeneratorService = new MealGeneratorService();
