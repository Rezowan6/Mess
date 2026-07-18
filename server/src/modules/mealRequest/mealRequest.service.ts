import sequelize from "@/configs/db.js";
import { ApiError } from "@/utils/ApiError.js";
import { mealEntryRepository } from "../mealEntry/mealEntry.repository.js";
import {
  ICreateMealRequestDto,
  MealRequestStatus,
} from "./mealRequest.interface.js";
import { mealRequestRepository } from "./mealRequest.repository.js";

export class MealRequestService {
  async create({
    payload,
    tenantId,
    userId,
    mealSessionId,
    date,
  }: {
    payload: ICreateMealRequestDto;
    tenantId: number;
    userId: number;
    mealSessionId: number;
    date: Date;
  }) {
    const { breakfast, lunch, dinner } = payload;

    const existingRequest =
      await mealRequestRepository.getByTenantMealSessionUserIdAndDate({
        tenantId,
        mealSessionId,
        userId,
        date,
      });

    if (existingRequest) {
      throw new ApiError(409, "Meal request already exists for this date");
    }

    if (!breakfast && !lunch && !dinner) {
      throw new ApiError(400, "Please select at least one meal");
    }

    return mealRequestRepository.create({
      ...payload,
      tenantId,
      mealSessionId,
      userId,
      status: MealRequestStatus.PENDING,
      date,
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
        status: MealRequestStatus.PENDING
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

      await mealEntryRepository.createWithOptions(
        {
          tenantId,
          userId: request.userId,
          mealSessionId: request.mealSessionId,
          date: request.date,

          breakfast: request.breakfast,
          lunch: request.lunch,
          dinner: request.dinner,

          mealRequestId: request.id,
        },
        { transaction },
      );

      return request;
    });
  }

  async approveAllPending({
    tenantId,
    managerId,
    mealSessionId,
    date,
  }: {
    tenantId: number;
    managerId: number;
    mealSessionId: number;
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
      const mealEntries = requests.map((request: any) => ({
        tenantId,
        userId: request.userId,
        mealSessionId,
        date: request.date,

        breakfast: request.breakfast,
        lunch: request.lunch,
        dinner: request.dinner,

        mealRequestId: request.id,
      }));

      await mealEntryRepository.bulkCreateMealEntries(mealEntries, transaction);

      await mealRequestRepository.bulkApproveRequests(
        requests.map((request) => request.id),
        managerId,
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
