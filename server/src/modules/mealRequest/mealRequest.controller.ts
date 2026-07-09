import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { mealRequestService } from "@/modules/containers/mealRequest.container.js";

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

  static getPendingRequests = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const mealRequest = await mealRequestService.getPendingRequests({
      tenantId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Pending meal requests fetched successfully.",
      data: mealRequest,
    });
  });

  static my = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const mealRequest = await mealRequestService.my({
      tenantId,
      userId
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal requests fetched successfully.",
      data: mealRequest,
    });
  });
}
