import type { Request, Response } from "express";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiError } from "@/utils/ApiError.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { mealPlanningService } from "./mealPlanning.service.js";

class MealPlanningController {
  getDailyMealPlanning = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const data = await mealPlanningService.getDailyMealPlanning(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Daily meal planning fetched successfully.",
      data,
    });
  });

  rejectMeal = asyncHandler(async (req: Request, res: Response) => {
    const {
      tenantId,
      userId: managerId,
      mealSessionId,
    } = getTenantContext(req);

    const userId = Number(req.params.userId);
    const { meal } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
      throw new ApiError(400, "Invalid user ID");
    }

    const allowedMeals = ["breakfast", "lunch", "dinner"] as const;

    if (!allowedMeals.includes(meal)) {
      throw new ApiError(400, "Invalid meal type");
    }

    const data = await mealPlanningService.rejectMeal({
      tenantId,
      userId,
      managerId,
      meal,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: `${meal} rejected successfully.`,
      data,
    });
  });
}

export const mealPlanningController = new MealPlanningController();
