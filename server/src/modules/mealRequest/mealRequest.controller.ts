import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { mealRequestService } from "@/modules/containers/mealRequest.container.js";
import { ApiError } from "@/utils/ApiError.js";
import { getCurrentDate } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";

export class MealRequestController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId, mealSessionId } = getTenantContext(req);
    const date = getCurrentDate();

    const mealRequest = await mealRequestService.create({
      payload: req.body,
      userId,
      tenantId,
      mealSessionId,
      date: new Date(date),
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Meal request created successfully.",
      data: mealRequest,
    });
  });

  static my = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const mealRequest = await mealRequestService.my({
      tenantId,
      userId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal requests fetched successfully.",
      data: mealRequest,
    });
  });

  static getPendingRequests = asyncHandler(
    async (req: Request, res: Response) => {
      const { tenantId, mealSessionId } = getTenantContext(req);

      const mealRequest = await mealRequestService.getPendingRequests({
        tenantId,
        mealSessionId,
      });

      return sendResponse(res, {
        statusCode: 201,
        message: "Pending meal requests fetched successfully.",
        data: mealRequest,
      });
    },
  );

  static approve = asyncHandler(async (req: Request, res: Response) => {
    const {
      tenantId,
      userId: managerId,
      mealSessionId,
    } = getTenantContext(req);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid request id is required");
    }
    const result = await mealRequestService.approve({
      id,
      tenantId,
      managerId,
      mealSessionId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Meal request approved successfully",
      data: result,
    });
  });

  static approveAll = asyncHandler(async (req: Request, res: Response) => {
    const {
      tenantId,
      userId: managerId,
      mealSessionId,
    } = getTenantContext(req);
    const { approvedCount } = await mealRequestService.approveAllPending({
      tenantId,
      managerId,
      mealSessionId,
      date: new Date(req.query.date as string),
    });

    sendResponse(res, {
      statusCode: 200,
      message: "All meal request approved successfully",
      data: approvedCount,
    });
  });

  static reject = asyncHandler(async (req: Request, res: Response) => {
    const {
      tenantId,
      userId: managerId,
      mealSessionId,
    } = getTenantContext(req);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid request id is required");
    }

    const result = await mealRequestService.reject({
      id,
      tenantId,
      mealSessionId,
      managerId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Meal request rejected successfully",
      data: result,
    });
  });
}
