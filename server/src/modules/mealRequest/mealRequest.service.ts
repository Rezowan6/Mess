import sequelize from "@/configs/db.js";
import { ApiError } from "@/utils/ApiError.js";
import {
  ICreateMealRequestByDateDto,
  ICreateMealRequestDbDto,
  ICreateMealRequestDto,
  IRejectReq,
  MealRequestStatus,
} from "./mealRequest.interface.js";
import { mealRequestRepository } from "./mealRequest.repository.js";

import { appTime } from "@/configs/time.js";
import { formatDate, getAppDate, isSameDate } from "@/utils/date.util.js";
import { UniqueConstraintError } from "sequelize";
import { mealEntryGenerator } from "../mealEntry/mealEntry.generator.js";
import { MealRequest } from "./mealRequest.model.js";

export class MealRequestService {
  // client site done
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

    return await sequelize.transaction(async (transaction) => {
      const createdRequests: ICreateMealRequestDbDto[] = [];

      const skippedRequests: {
        date: Date;
        reason: string;
      }[] = [];

      const startDate = appTime(fromDate).startOf("day");
      const endDate = appTime(toDate).startOf("day");

      let currentDate = startDate;

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
        existingRequests.map((request) => {
          return [formatDate(request.date), request];
        }),
      );

      while (currentDate <= endDate) {
        const requestDate = currentDate.toDate();

        const existingRequest = existingRequestMap.get(formatDate(requestDate));

        if (existingRequest) {
          skippedRequests.push({
            date: requestDate,
            reason:
              existingRequest.status === MealRequestStatus.PENDING
                ? "You already have a pending meal request for this date."
                : `A meal request already exists for this date with status "${existingRequest.status}".`,
          });

          currentDate = currentDate.add(1, "day");
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

        currentDate = currentDate.add(1, "day");
      }

      if (createdRequests.length) {
        try {
          await mealRequestRepository.bulkCreate(createdRequests, {
            transaction,
          });
        } catch (error) {
          if (error instanceof UniqueConstraintError) {
            throw new ApiError(
              409,
              "A meal request already exists for one or more selected dates.",
            );
          }

          throw error;
        }
      }

      return {
        createdCount: createdRequests.length,
        skippedCount: skippedRequests.length,
        totalRequestedDays: endDate.diff(startDate, "day") + 1,
        skippedRequests,
      };
    });
  }

  async createByDate(payload: ICreateMealRequestByDateDto) {
    const { tenantId, userId, date, breakfast, lunch, dinner } = payload;

    const today = getAppDate();

    if (date <= today) {
      throw new ApiError(404, `Meal request not allowed before today.`);
    }

    if (!breakfast && !lunch && !dinner) {
      throw new ApiError(400, "Please select at least one meal");
    }
    const existsRequest = await mealRequestRepository.findOneByDate({
      tenantId,
      userId,
      date,
    });

    if (existsRequest) {
      throw new ApiError(403, `Meal request already exisit for ${date}`);
    }

    const request = await mealRequestRepository.create(payload);

    return request;
  }

  // done
  async myPendingRequest({
    tenantId,
    userId,
    mealSessionId,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
  }) {
    const request = await mealRequestRepository.getMyPendingReq(
      tenantId,
      mealSessionId,
      userId,
    );

    if (!request) {
      throw new ApiError(404, "Meal Request not found.");
    }

    return request;
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

      const appDate = formatDate(getAppDate());
      const requestDate = formatDate(getAppDate(request.date));

      const isRejectDisabled = requestDate === appDate;

      if (isRejectDisabled) {
        throw new ApiError(400, "Today's meal requests cannot be rejected");
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

  // done
  async parmanetDelete({
    id,
    tenantId,
    userId,
  }: {
    id: number;
    tenantId: number;
    userId: number;
  }) {
    const date = getAppDate();

    const existsToDayPendingReq =
      await mealRequestRepository.findOneByDateAndId({
        id,
        tenantId,
        userId,
        date,
      });

    const isTodayPending = isSameDate(existsToDayPendingReq?.date, date);

    if (
      existsToDayPendingReq?.status === MealRequestStatus.PENDING &&
      isTodayPending
    ) {
      throw new ApiError(
        400,
        "You cannot delete today's pending meal request.",
      );
    }

    const deletedCount = await mealRequestRepository.delete(
      { id, tenantId, userId, status: MealRequestStatus.PENDING },
      { force: true },
    );

    if (!deletedCount) {
      throw new ApiError(404, "Meal request not found");
    }

    return {
      deleted: true,
      id,
    };
  }

  // baki ace
  async getRejectMeals({ tenantId, mealSessionId }: IRejectReq) {
    const rejectReq = await mealRequestRepository.getRejectMealReq({
      tenantId,
      mealSessionId,
    });

    console.log(rejectReq.length);

    if (rejectReq.length <= 0) {
      throw new ApiError(404, "Reject meal request not found.");
    }
    return rejectReq;
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

      const appDate = formatDate(getAppDate());
      const requestDate = formatDate(getAppDate(request.date));

      // Previous + Today enabled
      // Tomorrow + future dates disabled
      const isApproveDisabled = requestDate > appDate;

      if (isApproveDisabled) {
        throw new ApiError(
          400,
          "Meal requests for tomorrow and future dates cannot be approved",
        );
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
        requests.map((request: any) => request.id),
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

  async getApproves({
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
        status: MealRequestStatus.APPROVED,
      },
    });

    if (!mealRequest.length) {
      throw new ApiError(404, "today pending request not found.");
    }

    return mealRequest;
  }

  async getPendingRequests({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const mealRequest =
      await mealRequestRepository.getPendingRequestsByTenantId(
        tenantId,
        mealSessionId,
      );

    if (!mealRequest.length) {
      throw new ApiError(404, "today pending request not found.");
    }

    return mealRequest;
  }
}

export const mealRequestService = new MealRequestService();
