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
}
