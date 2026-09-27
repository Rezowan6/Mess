import sequelize from "@/configs/db.js";
import { checkMealCutoff } from "@/helpers/checkMealCutoff.helper.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { formatDisplayDate, getAppDate } from "@/utils/date.util.js";
import { logger } from "@/utils/logger.js";
import { getCurrentMealDate } from "@/utils/mealDate.js";
import { Transaction } from "sequelize";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { mealSettingRepository } from "../mealSetting/mealSetting.repository.js";
import { Notification } from "../notification/notification.interface.js";
import { notificationService } from "../notification/notification.service.js";
import { tenantRepository } from "../tenant/tenant.repository.js";
import {
  ICopyMealPreferencePayload,
  IUpsertPayload,
} from "./mealPreference.interface.js";
import { mealPreferenceRepository } from "./mealPreference.repository.js";

class MealPreferenceService {
  async upsert({ tenantId, userId, mealSessionId, payload }: IUpsertPayload) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

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
       * Get meal setting.
       */
      const mealSetting = await this.getMealSetting(tenantId);

      /**
       * Find existing meal preference.
       */
      const existingPreference = await mealPreferenceRepository.findOne({
        tenantId,
        userId,
      });

      /**
       * Validate meal cutoff.
       *
       * Apply cutoff validation for both:
       * - first-time preference
       * - existing preference
       */
      if (existingPreference) {
        this.validateMealCutoff(existingPreference, payload, mealSetting);
      }

      /**
       * ============================================================
       * CREATE / UPDATE MEAL PREFERENCE
       * ============================================================
       */
      let preference;

      if (!existingPreference) {
        preference = await this.createMealPreference({
          tenantId,
          userId,
          mealSessionId,
          payload,
          transaction,
        });
      } else {
        preference = await this.updateMealPreference({
          preferenceId: existingPreference.id,
          payload,
          transaction,
        });
      }

      /**
       * ============================================================
       * CREATE / UPDATE MEAL REQUEST
       * ============================================================
       */
      await this.updateMealRequest({
        tenantId,
        userId,
        mealSessionId,
        date,
        payload,
        transaction,
      });

      return preference;
    });

    /**
     * Transaction successfully committed.
     */
    this.emitMealPlanningUpdated(socketPayload);

    return result;
  }

  async createAutoMealReq() {
    const today = getAppDate();

    const tenants = await tenantRepository.getActiveTenants();

    let createdCount = 0;
    let existingCount = 0;
    let failedCount = 0;
    let noSessionCount = 0;

    for (const tenant of tenants) {
      try {
        const mealSession = await mealSessionRepository.getOpenSession(
          tenant.id,
        );

        if (!mealSession) {
          noSessionCount++;

          logger.warn(
            { tenantId: tenant.id },
            "Auto meal request skipped: no active meal session",
          );

          continue;
        }

        const preferences = await mealPreferenceRepository.getActivePreferences(
          {
            tenantId: tenant.id,
          },
        );

        for (const preference of preferences) {
          try {
            const result = await sequelize.transaction(async (transaction) => {
              const existingRequest = await mealRequestRepository.findOneByDate(
                {
                  tenantId: tenant.id,
                  userId: preference.userId,
                  date: today,
                  transaction,
                },
              );

              if (existingRequest) {
                return {
                  created: false,
                  request: existingRequest,
                };
              }

              const mealRequest = await mealRequestRepository.createWithOptions(
                {
                  tenantId: tenant.id,
                  userId: preference.userId,
                  mealSessionId: mealSession.id,
                  date: today,

                  breakfast: preference.breakfast ?? 0,
                  lunch: preference.lunch ?? 0,
                  dinner: preference.dinner ?? 0,
                  guestMeal: preference.guestMeal ?? 0,

                  status: MealRequestStatus.PENDING,
                },
                { transaction },
              );

              return {
                created: true,
                request: mealRequest,
              };
            });

            if (!result.created) {
              existingCount++;
              continue;
            }

            createdCount++;

            const request = result.request;

            // System-generated notification
            await notificationService.create({
              tenantId: tenant.id,
              userId: preference.userId,
              createdBy: preference.userId, // system-generated
              mealSessionId: mealSession.id,
              title: "Meal Request Created",
              message: `Your meal request for ${formatDisplayDate(
                getAppDate(),
              )} has been automatically created based on your meal preferences.`,
              type: Notification.MEAL_REQUEST_CREATED,
            });

            // Realtime meal planning update
            this.emitMealPlanningUpdated({
              tenantId: tenant.id,
              mealSessionId: mealSession.id,
              userId: preference.userId,
              date: today,
              breakfast: request.breakfast,
              lunch: request.lunch,
              dinner: request.dinner,
              guestMeal: request.guestMeal,
            });
          } catch (error) {
            failedCount++;

            logger.error(
              {
                tenantId: tenant.id,
                userId: preference.userId,
                error,
              },
              "Auto meal request generation failed for user",
            );
          }
        }
      } catch (error) {
        failedCount++;

        logger.error(
          {
            tenantId: tenant.id,
            error,
          },
          "Auto meal request generation failed for tenant",
        );
      }
    }

    return {
      date: today,
      createdCount,
      existingCount,
      failedCount,
      noSessionCount,
    };
  }

  /**
   * ============================================================
   * CREATE MEAL PREFERENCE
   * ============================================================
   */
  private async createMealPreference({
    tenantId,
    userId,
    mealSessionId,
    payload,
    transaction,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
    payload: IUpsertPayload["payload"];
    transaction: Transaction;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    return mealPreferenceRepository.createWithOptions(
      {
        tenantId,
        userId,
        mealSessionId,
        breakfast: payload.breakfast,
        lunch: payload.lunch,
        dinner: payload.dinner,
        guestMeal: payload.guestMeal ?? 0,
        isActive: true,
      },
      {
        transaction,
      },
    );
  }

  /**
   * ============================================================
   * GET MEAL SETTING
   * ============================================================
   */
  private async getMealSetting(tenantId: number) {
    const mealSetting = await mealSettingRepository.findOne({
      tenantId,
    });

    if (!mealSetting) {
      throw new ApiError(404, "Meal setting not found");
    }

    return mealSetting;
  }

  /**
   * ============================================================
   * VALIDATE MEAL CUTOFF
   * ============================================================
   */
  private validateMealCutoff(
    existingPreference: any,
    payload: IUpsertPayload["payload"],
    mealSetting: any,
  ) {
    if (Number(existingPreference.breakfast) !== Number(payload.breakfast)) {
      checkMealCutoff({
        mealSetting,
        meal: "breakfast",
      });
    }

    if (Number(existingPreference.lunch) !== Number(payload.lunch)) {
      checkMealCutoff({
        mealSetting,
        meal: "lunch",
      });
    }

    if (Number(existingPreference.dinner) !== Number(payload.dinner)) {
      checkMealCutoff({
        mealSetting,
        meal: "dinner",
      });
    }
  }

  /**
   * ============================================================
   * UPDATE MEAL REQUEST
   * ============================================================
   */
  private async updateMealRequest({
    tenantId,
    userId,
    mealSessionId,
    date,
    payload,
    transaction,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
    date: Date;
    payload: {
      breakfast?: number;
      lunch?: number;
      dinner?: number;
      guestMeal?: number;
    };
    transaction: Transaction;
  }) {
    /**
     * Find request for this specific date.
     */
    const existingRequest = await mealRequestRepository.findOneByDate({
      tenantId,
      userId,
      date,
      transaction,
    });

    /**
     * ============================================================
     * CREATE NEW DAILY MEAL REQUEST
     * ============================================================
     */
    if (!existingRequest) {
      return await mealRequestRepository.createWithOptions(
        {
          tenantId,
          userId,
          mealSessionId,
          date,

          breakfast: payload.breakfast ?? 0,
          lunch: payload.lunch ?? 0,
          dinner: payload.dinner ?? 0,
          guestMeal: payload.guestMeal ?? 0,

          status: MealRequestStatus.PENDING,
        },
        { transaction },
      );
    }

    /**
     * ============================================================
     * UPDATE EXISTING DAILY MEAL REQUEST
     * ============================================================
     */
    return await mealRequestRepository.updateById(
      existingRequest.id,
      {
        breakfast: payload.breakfast ?? 0,
        lunch: payload.lunch ?? 0,
        dinner: payload.dinner ?? 0,
        guestMeal: payload.guestMeal ?? 0,
      },
      transaction,
    );
  }

  /**
   * ============================================================
   * UPDATE MEAL PREFERENCE
   * ============================================================
   */
  private async updateMealPreference({
    preferenceId,
    payload,
    transaction,
  }: {
    preferenceId: number;
    payload: IUpsertPayload["payload"];
    transaction: Transaction;
  }) {
    return mealPreferenceRepository.update(
      { id: preferenceId },
      {
        breakfast: payload.breakfast,
        lunch: payload.lunch,
        dinner: payload.dinner,
        guestMeal: payload.guestMeal ?? 0,
      },
      {
        transaction,
      },
    );
  }

  /**
   * ============================================================
   * SOCKET EVENT
   * ============================================================
   */
  private emitMealPlanningUpdated(socketPayload: {
    tenantId: number;
    mealSessionId: number;
    userId: number;
    date: Date;
    breakfast: number;
    lunch: number;
    dinner: number;
    guestMeal: number;
  }) {
    socketService.emitToTenant(
      socketPayload.tenantId,
      SocketEvent.MEAL_PLANNING_UPDATED,
      socketPayload,
    );
  }

  // baki ace pore korbo ingsa-allah
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
