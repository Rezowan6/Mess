import sequelize from "@/configs/db.js";
import { checkMealCutoff } from "@/helpers/checkMealCutoff.helper.js";
import { ApiError } from "@/utils/ApiError.js";
import { getCurrentDate } from "@/utils/date.util.js";
import { mealEntryRepository } from "../mealEntry/mealEntry.repository.js";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { mealSettingRepository } from "../mealSetting/mealSetting.repository.js";
import { IUpsertPayload } from "./mealPreference.interface.js";
import { mealPreferenceRepository } from "./mealPreference.repository.js";

class MealPreferenceService {
  async upsert({ tenantId, userId, payload }: IUpsertPayload) {
    const { breakfast, lunch, dinner, guestMeal } = payload;

    const date = getCurrentDate();

    return await sequelize.transaction(async (transaction) => {
      const existingPreference = await mealPreferenceRepository.findOne({
        tenantId,
        userId,
      });

      const mealSetting = await mealSettingRepository.findOne({
        tenantId,
      });

      if (!mealSetting) {
        throw new ApiError(404, "Meal setting not found");
      }

      const mealSession =
        await mealSessionRepository.getCurrentSession(tenantId);

      if (!mealSession) {
        throw new ApiError(404, "Meal session not found");
      }

      /**
       * First time create
       */
      if (!existingPreference) {
        return await mealPreferenceRepository.createWithOptions(
          {
            tenantId,
            userId,
            mealSessionId: mealSession.id,

            breakfast,
            lunch,
            dinner,
            guestMeal: guestMeal ?? 0,

            isActive: true,
          },
          {
            transaction,
          },
        );
      }

      /**
       * Check ON OFF action
       */
      if (Number(existingPreference.breakfast) !== Number(breakfast)) {
        checkMealCutoff({
          mealSetting,
          meal: "breakfast",
        });
      }

      if (Number(existingPreference.lunch) !== Number(lunch)) {
        checkMealCutoff({
          mealSetting,
          meal: "lunch",
        });
      }

      if (Number(existingPreference.dinner) !== Number(dinner)) {
        checkMealCutoff({
          mealSetting,
          meal: "dinner",
        });
      }

      /**
       * Update Today's Meal Request
       */
      const todayRequest = await mealRequestRepository.findTodayRequest({
        tenantId,
        userId,
        date,
      });

      if (todayRequest) {
        await mealRequestRepository.update(
          { id: todayRequest.id },
          {
            breakfast,
            lunch,
            dinner,
            guestMeal: guestMeal ?? 0,
          },
          { transaction },
        );
      }

      if (todayRequest && todayRequest.status === MealRequestStatus.APPROVED) {
        const entry = await mealEntryRepository.findOne({
          mealRequestId: todayRequest.id,
        });
        if (entry) {
          await mealEntryRepository.update(
            { mealRequestId: todayRequest.id },
            {
              breakfast,
              lunch,
              dinner,
              guestMeal: guestMeal ?? 0,
            },
            { transaction },
          );
        }
      }

      /**
       * Update Meal Preference
       */
      return await mealPreferenceRepository.update(
        { id: existingPreference.id },
        {
          breakfast,
          lunch,
          dinner,
          guestMeal: guestMeal ?? 0,
        },
        { transaction },
      );
    });
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
