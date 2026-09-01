import sequelize from "@/configs/db.js";
import { checkMealCutoff } from "@/helpers/checkMealCutoff.helper.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { getCurrentMealDate } from "@/utils/mealDate.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { mealSettingRepository } from "../mealSetting/mealSetting.repository.js";
import {
  ICopyMealPreferencePayload,
  IUpsertPayload,
} from "./mealPreference.interface.js";
import { mealPreferenceRepository } from "./mealPreference.repository.js";

class MealPreferenceService {
  async upsert({ tenantId, userId, mealSessionId, payload }: IUpsertPayload) {
    const { breakfast, lunch, dinner, guestMeal } = payload;

    /**
     * Meal date is based on Maghrib.
     *
     * Before Maghrib → Today
     * After Maghrib  → Tomorrow
     */
    const date = getCurrentMealDate();

    const socketPayload = {
      tenantId,
      mealSessionId,
      userId,
      date,
      breakfast: breakfast ?? 0,
      lunch: lunch ?? 0,
      dinner: dinner ?? 0,
      guestMeal: guestMeal ?? 0,
    };

    const result = await sequelize.transaction(async (transaction) => {
      /**
       * Find existing meal preference.
       */
      const existingPreference = await mealPreferenceRepository.findOne({
        tenantId,
        userId,
      });

      /**
       * Get tenant meal settings.
       */
      const mealSetting = await mealSettingRepository.findOne({
        tenantId,
      });

      if (!mealSetting) {
        throw new ApiError(404, "Meal setting not found");
      }

      /**
       * Validate meal session.
       */
      const mealSession = await mealSessionRepository.findById(mealSessionId);

      if (!mealSession) {
        throw new ApiError(404, "Meal session not found");
      }

      /**
       * ============================================================
       * FIRST TIME CREATE
       * ============================================================
       *
       * Only create/update the preference here.
       *
       * Do NOT create Meal Request manually.
       * Do NOT create Meal Entry manually.
       *
       * Daily Meal Request Job will generate the request
       * for the appropriate meal date.
       */
      if (!existingPreference) {
        return await mealPreferenceRepository.createWithOptions(
          {
            tenantId,
            userId,
            mealSessionId,

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
       * ============================================================
       * CHECK MEAL CUTOFF
       * ============================================================
       *
       * Only check cutoff when the member actually changes
       * the meal preference.
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
       * ============================================================
       * FIND MEAL REQUEST FOR CURRENT MEAL DATE
       * ============================================================
       *
       * Before Maghrib:
       *   date = today
       *
       * After Maghrib:
       *   date = tomorrow
       */
      const mealRequest = await mealRequestRepository.findByDate({
        tenantId,
        userId,
        date,
      });

      /**
       * ============================================================
       * UPDATE MEAL REQUEST
       * ============================================================
       *
       * Member ON/OFF only updates the Meal Request.
       *
       * IMPORTANT:
       * We intentionally DO NOT update Meal Entry here.
       *
       * Meal Entry is created/managed by the Meal Request
       * generation/approval flow.
       */
      if (mealRequest) {
        await mealRequestRepository.update(
          { id: mealRequest.id },
          {
            breakfast,
            lunch,
            dinner,
            guestMeal: guestMeal ?? 0,
          },
          {
            transaction,
          },
        );
      }

      /**
       * ============================================================
       * UPDATE MEAL PREFERENCE
       * ============================================================
       */
      return await mealPreferenceRepository.update(
        { id: existingPreference.id },
        {
          breakfast,
          lunch,
          dinner,
          guestMeal: guestMeal ?? 0,
        },
        {
          transaction,
        },
      );
    });

    /**
     * Transaction successfully committed.
     *
     * Emit realtime event only after successful commit.
     */
    socketService.emitToTenant(
      tenantId,
      SocketEvent.MEAL_PLANNING_UPDATED,
      socketPayload,
    );

    return result;
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

  // baki ace pore korbo ingsa-allah-----

  async copyFromPreviousSession({
    tenantId,
    previousMealSessionId,
    currentMealSessionId,
  }: ICopyMealPreferencePayload) {
    return sequelize.transaction(async (transaction) => {
      const previousPreferences =
        await mealPreferenceRepository.getByMealSession({
          tenantId,
          mealSessionId: previousMealSessionId,
        });

      if (!previousPreferences.length) {
        return {
          copiedCount: 0,
        };
      }

      const newPreferences = previousPreferences.map((preference) => ({
        tenantId,

        mealSessionId: currentMealSessionId,

        userId: preference.userId,

        breakfast: preference.breakfast,

        lunch: preference.lunch,

        dinner: preference.dinner,

        guestMeal: preference.guestMeal,

        isActive: true,
      }));

      await mealPreferenceRepository.bulkCreate(newPreferences, {
        transaction,
      });

      return {
        copiedCount: newPreferences.length,
      };
    });
  }
}

export const mealPreferenceService = new MealPreferenceService();
