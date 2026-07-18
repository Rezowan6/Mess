import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { mealSessionService } from "./MealSession.service.js";

class MealSessionController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const session = await mealSessionService.create(tenantId, userId);

    return sendResponse(res, {
      statusCode: 201,
      message: "Meal session created successfully",
      data: session,
    });
  });

  getCurrentSession = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const session = await mealSessionService.getCurrentSession(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Current meal session fetched successfully.",
      data: session,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const session = await mealSessionService.getAll(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal session fetched successfully.",
      data: session,
    });
  });

  close = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const sessionId = Number(req.params.id);

    const session = await mealSessionService.close({
      tenantId,
      sessionId,
      userId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal session closed successfully.",
      data: session,
    });
  });
}

export const mealSessionController = new MealSessionController();
