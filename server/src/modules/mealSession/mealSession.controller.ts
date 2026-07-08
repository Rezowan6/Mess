import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { MealSessionService } from "./MealSession.service.js";

export class MealSessionController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const session = await MealSessionService.create(tenantId, userId);

    return sendResponse(res, {
      statusCode: 201,
      message: "Meal session created successfully",
      data: session,
    });
  });

  static getCurrent = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const session = await MealSessionService.getCurrent(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Current meal session fetched successfully.",
      data: session,
    });
  });


  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const session = await MealSessionService.getAll(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal session fetched successfully.",
      data: session,
    });
  });


  static close = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const sessionId = Number(req.params.id);

    const session = await MealSessionService.close({tenantId, sessionId, userId});

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal session closed successfully.",
      data: session,
    });
  });
}
