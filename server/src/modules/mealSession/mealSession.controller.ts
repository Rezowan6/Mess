import { getTenantBaseContext } from "@/helpers/getTenantBaseContext.js";
import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiError } from "@/utils/ApiError.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { mealSessionService } from "./mealSession.service.js";

class MealSessionController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantBaseContext(req);

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

  getCompletedSessions = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantBaseContext(req);

    const sessions = await mealSessionService.getCompletedSessions(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Completed meal sessions fetched successfully.",
      data: sessions,
    });
  });

  close = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const sessionId = Number(req.params.id);

    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      throw new ApiError(400, "Invalid meal session id.");
    }

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
