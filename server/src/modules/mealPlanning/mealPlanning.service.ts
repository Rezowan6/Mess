import { getCurrentDate } from "@/utils/date.util.js";
import { mealEntryRepository } from "../mealEntry/mealEntry.repository.js";
import { mealPreferenceRepository } from "../MealPreference/mealPreference.repository.js";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";

import sequelize from "@/configs/db.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import type {
  IMealPlanningEntry,
  IMealPlanningMember,
  IMealPlanningResponse,
  IMealPlanningSummary,
  IRejectMealPayload,
} from "./mealPlanning.interface.js";
import { notificationService } from "../notification/notification.service.js";
import { Notification } from "../notification/notification.interface.js";

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
      summary.breakfast + summary.lunch + summary.dinner + summary.guestMeal;

    return summary;
  }

  private buildMealMemberList(
    entries: IMealPlanningEntry[],
    meal: "breakfast" | "lunch" | "dinner" | "guestMeal",
  ): IMealPlanningMember[] {
    return entries
      .filter((entry) => Number(entry[meal]) > 0)
      .map((entry) => ({
        userId: entry.userId,
        memberName: entry.user?.name ?? "Unknown Member",
        avatar: entry.user.avatar ?? null,
        meal: Number(entry[meal]),
      }));
  }

  async getDailyMealPlanning(tenantId: number): Promise<IMealPlanningResponse> {
    const preferences = await mealPreferenceRepository.getActivePreferences({
      tenantId,
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

    const guestMeal = this.buildMealMemberList(entries, "guestMeal");

    return {
      summary,
      breakfast,
      lunch,
      dinner,
      guestMeal,
    };
  }

  async rejectMeal({ tenantId, userId, managerId, meal }: IRejectMealPayload) {
    const result = await sequelize.transaction(async (transaction) => {
      const preference = await mealPreferenceRepository.findOneWithOptions({
        where: {
          tenantId,
          userId,
        },
        transaction,
      });

      if (!preference) {
        throw new ApiError(404, "Meal preference not found");
      }

      if (Number(preference[meal]) <= 0) {
        throw new ApiError(
          400,
          `${meal} is already turned off for this member.`,
        );
      }

      const date = getCurrentDate();

      /**
       * Update today's meal request
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
            [meal]: 0,
          },
          { transaction },
        );
      }

      /**
       * Update meal entry if today's request is approved
       */
      if (todayRequest && todayRequest.status === MealRequestStatus.APPROVED) {
        const entry = await mealEntryRepository.findOne({
          mealRequestId: todayRequest.id,
        });

        if (entry) {
          await mealEntryRepository.update(
            { mealRequestId: todayRequest.id },
            {
              [meal]: 0,
            },
            { transaction },
          );
        }
      }

      /**
       * Update meal preference
       */
      const updatedPreference = await mealPreferenceRepository.update(
        { id: preference.id },
        {
          [meal]: 0,
        },
        { transaction },
      );

      return updatedPreference;
    });

    await notificationService.create(tenantId, userId, managerId, {
      title: "Meal Rejected",
      message: `Your ${meal} meal has been turned off by the manager.`,
      type: Notification.MEAL_REJECTED,
    });

    // Transaction successfully committed
    // realtime event
    socketService.emitToTenant(tenantId, SocketEvent.MEAL_PLANNING_UPDATED, {
      tenantId,
      userId,
      meal,
    });

    return result;
  }
}

export const mealPlanningService = new MealPlanningService();
