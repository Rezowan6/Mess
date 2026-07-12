import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { mealEntryService } from "@/modules/containers/mealEntry.container.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";

export class MealEntriesController {
  static my = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId } = getTenantContext(req);

    const data = await mealEntryService.my({ tenantId, userId });

    return sendResponse(res, {
      statusCode: 200,
      message: "My meal featch successfully.",
      data,
    });
  });

  static daily = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const data = await mealEntryService.daily({
      tenantId,
      date: new Date(req.query.date as string),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Today meal featch successfully.",
      data,
    });
  });

  static dailySummary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const date = new Date(req.query.date as string);

    const data = await mealEntryService.dailySummary({
      tenantId,
      date,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Daily meal summary fetched successfully.",
      data,
    });
  });

  static memberSummary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const data = await mealEntryService.memberSummary({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Member meal summary fetched successfully.",
      data,
    });
  });

  static summary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const data = await mealEntryService.summary({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal summary fetched successfully.",
      data,
    });
  });
}
