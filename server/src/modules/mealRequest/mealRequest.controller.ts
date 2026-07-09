import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { mealRequestService } from "@/modules/containers/mealRequest.container.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";

export class MealRequestController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId } = getTenantContext(req);

    const mealRequest = await mealRequestService.create({
      ...req.body,
      userId,
      tenantId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Meal request created successfully.",
      data: mealRequest,
    });
  });

  static getPendingRequests = asyncHandler(
    async (req: Request, res: Response) => {
      const { tenantId } = getTenantContext(req);

      const mealRequest = await mealRequestService.getPendingRequests({
        tenantId,
      });

      return sendResponse(res, {
        statusCode: 201,
        message: "Pending meal requests fetched successfully.",
        data: mealRequest,
      });
    },
  );

  static my = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const mealRequest = await mealRequestService.my({
      tenantId,
      userId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal requests fetched successfully.",
      data: mealRequest,
    });
  });

  static approve = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId: managerId } = getTenantContext(req);
    const result = await mealRequestService.approve({
      id: Number(req.body.id),
      tenantId,
      managerId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Meal request approved successfully",
      data: result,
    });
  });

  static approveAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId: managerId } = getTenantContext(req);
    const { approvedCount } = await mealRequestService.approveAllPending({
      tenantId,
      managerId,
      date: req.body.date,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "All meal request approved successfully",
      data: approvedCount,
    });
  });

  static reject = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId: managerId } = getTenantContext(req);

    const result = await mealRequestService.reject({
      id: Number(req.params.id),
      tenantId,
      managerId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Meal request rejected successfully",
      data: result,
    });
  });
}
