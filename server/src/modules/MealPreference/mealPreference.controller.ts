import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { mealPreferenceService } from "./mealPreference.service.js";

class MealPreferenceController {
  upsert = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId, mealSessionId, } = getTenantContext(req);

    const data = await mealPreferenceService.upsert({
      tenantId,
      userId,
      mealSessionId,
      payload: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "My meal preference update successfully.",
      data,
    });
  });

  getMyPreference = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId, mealSessionId, } = getTenantContext(req);

    const data = await mealPreferenceService.getMyPreference({
      tenantId,
      mealSessionId,
      userId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "My meal preference retrieved successfully.",
      data,
    });
  });
}

export const mealPreferenceController = new MealPreferenceController();
