import type { Request, Response } from "express";



import { mealPlanningService } from "./mealPlanning.service.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { getCurrentDate } from "@/utils/date.util.js";

class MealPlanningController {
  getDailyMealPlanning = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const date = getCurrentDate() as string;

    const data = await mealPlanningService.getDailyMealPlanning(
      tenantId,
      mealSessionId,
      date,
    );

    return sendResponse(res, {
      statusCode: 200,
      message: "Daily meal planning fetched successfully.",
      data,
    });
  });
}

export const mealPlanningController = new MealPlanningController();
