import { mealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";

import sequelize from "@/configs/db.js";
import { appTime } from "@/configs/time.js";

import { mealEntryGenerator } from "../mealEntry/mealEntry.generator.js";
import { IGenerateDailyMealRequestPayload } from "../MealPreference/mealPreference.interface.js";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import { Notification } from "../notification/notification.interface.js";
import { notificationService } from "../notification/notification.service.js";
import { socketService } from "@/socket/socket.service.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { RealtimeAction, RealtimeResource } from "@/socket/realtime.constant.js";

class MealGeneratorService {
  async generateDailyMealRequests({
    tenantId,
    date,
  }: IGenerateDailyMealRequestPayload) {
    const mealSession = await mealSessionRepository.getOpenSession(tenantId);

    if (!mealSession) {
      console.log(
        `[MealGenerator] No current meal session found for tenant ${tenantId}`,
      );

      return {
        createdRequests: 0,
        createdEntries: 0,
      };
    }

    const result = await sequelize.transaction(async (transaction) => {
      const pendingRequests = await mealRequestRepository.findPendingByDate({
        tenantId,
        mealSessionId: mealSession.id,
        date,
        transaction,
      });

      if (!pendingRequests.length) {
        console.log(
          `[MealGenerator] No pending meal requests found for tenant ${tenantId}, date ${appTime(
            date,
          ).format("YYYY-MM-DD")}`,
        );

        return {
          createdRequests: 0,
          createdEntries: 0,
          requests: [],
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
        createdRequests: pendingRequests.length,
        createdEntries,
        requests: pendingRequests,
      };
    });

    /**
     * Transaction successfully committed.
     *
     * Notifications are intentionally created outside
     * the transaction so notification failure cannot
     * rollback Meal Entry or Meal Request changes.
     */
    if (result.createdEntries > 0) {

         // Realtime: signal only, the frontend refetches fresh data
      socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.MEAL_REQUEST,
        action: RealtimeAction.UPDATED,
        tenantId,
        mealSessionId: mealSession.id,
      });

      socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.MEAL_ENTRY,
        action: RealtimeAction.CREATED,
        tenantId,
        mealSessionId: mealSession.id,
      });
      for (const request of result.requests) {
        try {
          await notificationService.create({
            tenantId,
            userId: request.userId,
            createdBy: request.userId, // system-generated
            mealSessionId: mealSession.id,
            title: "Meal Approved",
            message: `Your meal request for ${appTime(date).format(
              "DD MMM YYYY",
            )} has been approved and your meal entry has been created.`,
            type: Notification.MEAL_REQUEST_APPROVED,
          });
        } catch (error) {
          console.error(
            `[MealGenerator] Failed to create notification for tenant ${tenantId}, user ${request.userId}:`,
            error,
          );
        }
      }
    }

    return {
      createdRequests: result.createdRequests,
      createdEntries: result.createdEntries,
    };
  }
}

export const mealGeneratorService = new MealGeneratorService();
