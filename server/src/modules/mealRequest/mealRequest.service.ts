import sequelize from "@/configs/db.js";
import { ApiError } from "@/utils/ApiError.js";
import {
  ICreateMealRequestDbDto,
  ICreateMealRequestDto,
  MealRequestStatus,
} from "./mealRequest.interface.js";
import { mealRequestRepository } from "./mealRequest.repository.js";

import { formatDate } from "@/utils/date.util.js";
import { mealEntryGenerator } from "../mealEntry/mealEntry.generator.js";
import { mealCutoffService } from "../mealSetting/mealCutoff.service.js";
import { mealSettingRepository } from "../mealSetting/mealSetting.repository.js";
import { MealRequest } from "./mealRequest.model.js";

export class MealRequestService {
  async create({
    payload,
    tenantId,
    userId,
    mealSessionId,
  }: {
    payload: ICreateMealRequestDto;
    tenantId: number;
    userId: number;
    mealSessionId: number;
  }) {
    const { fromDate, toDate, breakfast, lunch, dinner } = payload;

    if (!breakfast && !lunch && !dinner) {
      throw new ApiError(400, "Please select at least one meal");
    }

    if (fromDate > toDate) {
      throw new ApiError(400, "From date cannot be greater than to date.");
    }

    const mealSetting =
      await mealSettingRepository.getRequiredByTenantId(tenantId);

    return await sequelize.transaction(async (transaction) => {
      const createdRequests: ICreateMealRequestDbDto[] = [];

      const skippedRequests: {
        date: Date;
        reason: string;
      }[] = [];

      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      const currentDate = new Date(startDate);

      const existingRequests =
        await mealRequestRepository.getExistingRequestsInRange(
          {
            tenantId,
            mealSessionId,
            userId,
            fromDate,
            toDate,
          },
          transaction,
        );

      const existingRequestMap = new Map(
        existingRequests.map((request) => [formatDate(request.date), request]),
      );

      while (currentDate <= endDate) {
        const requestDate = new Date(currentDate);

        const existingRequest = existingRequestMap.get(formatDate(requestDate));

        if (existingRequest) {
          skippedRequests.push({
            date: requestDate,
            reason: "Already exists.",
          });

          currentDate.setDate(currentDate.getDate() + 1);

          continue;
        }

        if (
          breakfast &&
          !mealCutoffService.canTakeBreakfast(mealSetting, requestDate)
        ) {
          skippedRequests.push({
            date: requestDate,
            reason: "Breakfast cutoff time passed.",
          });

          currentDate.setDate(currentDate.getDate() + 1);

          continue;
        }

        if (
          lunch &&
          !mealCutoffService.canTakeLunch(mealSetting, requestDate)
        ) {
          skippedRequests.push({
            date: requestDate,
            reason: "Lunch cutoff time passed.",
          });

          currentDate.setDate(currentDate.getDate() + 1);

          continue;
        }

        if (
          dinner &&
          !mealCutoffService.canTakeDinner(mealSetting, requestDate)
        ) {
          skippedRequests.push({
            date: requestDate,
            reason: "Dinner cutoff time passed.",
          });

          currentDate.setDate(currentDate.getDate() + 1);

          continue;
        }
        const requestData: ICreateMealRequestDbDto = {
          tenantId,
          mealSessionId,
          userId,

          date: requestDate,

          breakfast: breakfast ?? 0,
          lunch: lunch ?? 0,
          dinner: dinner ?? 0,

          status: MealRequestStatus.PENDING,
        };

        createdRequests.push(requestData);

        existingRequestMap.set(
          formatDate(requestDate),
          requestData as MealRequest,
        );

        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (createdRequests.length) {
        await mealRequestRepository.bulkCreate(createdRequests, {
          transaction,
        });
      }

      return {
        createdCount: createdRequests.length,

        skippedCount: skippedRequests.length,

        skippedRequests,
      };
    });
  }

  async getPendingRequests({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const mealRequest = await mealRequestRepository.findAll({
      where: {
        tenantId,
        mealSessionId,
        status: MealRequestStatus.PENDING,
      },
    });

    if (!mealRequest.length) {
      throw new ApiError(404, "today pending request not found.");
    }

    return mealRequest;
  }

  async myPendingRequest({
    tenantId,
    userId,
    mealSessionId,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
  }) {
    const request = await mealRequestRepository.findOne({
      userId,
      tenantId,
      mealSessionId,
      status: MealRequestStatus.PENDING,
    });

    if (!request) {
      throw new ApiError(404, "Meal Request not found.");
    }

    return request;
  }

  async approve({
    id,
    tenantId,
    managerId,
    mealSessionId,
  }: {
    id: number;
    tenantId: number;
    managerId: number;
    mealSessionId: number;
  }) {
    return await sequelize.transaction(async (transaction) => {
      const request = await mealRequestRepository.findOne({
        id,
        mealSessionId,
      });

      if (!request) {
        throw new ApiError(404, "Meal request not found.");
      }

      if (request.tenantId !== tenantId) {
        throw new ApiError(400, "Unauthorized.");
      }

      if (request.status !== MealRequestStatus.PENDING) {
        throw new ApiError(400, "Only pending request can be approved");
      }

      await mealRequestRepository.updateMealRequest(
        id,
        mealSessionId,
        {
          status: MealRequestStatus.APPROVED,
          approvedBy: managerId,
          approvedAt: new Date(),
        },
        transaction,
      );

      await mealEntryGenerator.createFromMealRequest(request, transaction);

      return request;
    });
  }

  async approveRange({
    tenantId,
    managerId,
    mealSessionId,
    fromDate,
    toDate,
  }: {
    tenantId: number;
    managerId: number;
    mealSessionId: number;
    fromDate: Date;
    toDate: Date;
  }) {
    return await sequelize.transaction(async (transaction) => {
      const requests =
        await mealRequestRepository.getPendingRequestsByDateRange({
          tenantId,
          mealSessionId,
          fromDate,
          toDate,
        });

      if (!requests.length) {
        throw new ApiError(404, "No pending meal requests found.");
      }

      await mealRequestRepository.bulkApproveRequests(
        requests.map((request) => request.id),

        managerId,

        transaction,
      );

      await mealEntryGenerator.bulkCreateFromMealRequests(
        requests,
        transaction,
      );

      return {
        approvedCount: requests.length,
      };
    });
  }

  async approveAllPending({
    tenantId,
    managerId,
    date,
  }: {
    tenantId: number;
    managerId: number;
    date: Date;
  }) {
    return sequelize.transaction(async (transaction) => {
      const requests = await mealRequestRepository.getPendingRequestsByDate({
        tenantId,
        date,
      });
      if (!requests.length) {
        throw new ApiError(404, "No pending meal requests found.");
      }

      await mealRequestRepository.bulkApproveRequests(
        requests.map((request) => request.id),
        managerId,
        transaction,
      );

      await mealEntryGenerator.bulkCreateFromMealRequests(
        requests,
        transaction,
      );

      return {
        approvedCount: requests.length,
      };
    });
  }

  async reject({
    id,
    tenantId,
    mealSessionId,
    managerId,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
    managerId: number;
  }) {
    return sequelize.transaction(async (transaction) => {
      const request = await mealRequestRepository.findOne({
        id,
        mealSessionId,
      });

      if (!request) {
        throw new ApiError(404, "Meal request not found.");
      }

      if (request.tenantId !== tenantId) {
        throw new ApiError(403, "You cannot reject this request.");
      }

      if (request.status !== MealRequestStatus.PENDING) {
        throw new ApiError(400, "Only pending request can be rejected.");
      }

      await mealRequestRepository.updateMealRequest(
        id,
        mealSessionId,
        {
          status: MealRequestStatus.REJECTED,
          rejectedBy: managerId,
          rejectedAt: new Date(),
        },
        transaction,
      );

      return {
        ...request,
        status: MealRequestStatus.REJECTED,
      };
    });
  }
}

export const mealRequestService = new MealRequestService();
