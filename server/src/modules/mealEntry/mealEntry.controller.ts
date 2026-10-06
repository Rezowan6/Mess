import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { mealEntryService } from "./mealEntry.service.js";

class MealEntriesController {
  my = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId, mealSessionId } = getTenantContext(req);

    const data = await mealEntryService.my({ tenantId, userId, mealSessionId});

    return sendResponse(res, {
      statusCode: 200,
      message: "My meal featch successfully.",
      data,
    });
  });

  getAllMembersMeal = asyncHandler(async (req: Request, res: Response) => {
    const { mealSessionId, tenantId } = getTenantContext(req);

    const data = await mealEntryService.getAllMembersMeal({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "All members meal featch successfully.",
      data,
    });
  });

  todayMealEntries = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const data = await mealEntryService.todayMealEntries({
      tenantId,
      date: new Date(req.query.date as string),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Today meal featch successfully.",
      data,
    });
  });

  dailySummary = asyncHandler(async (req: Request, res: Response) => {
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

  getMemberMealSummary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const query = req.query as IPaginationQuery;

    const mealSummary = await mealEntryService.getMemberMealSummary({
      tenantId,
      mealSessionId,
      query,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Member meal summary fetched successfully",
      data: mealSummary.data,
      meta: mealSummary.meta,
    });
  });

  memberSummary = asyncHandler(async (req: Request, res: Response) => {
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

  summary = asyncHandler(async (req: Request, res: Response) => {
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

export const mealEntryController = new MealEntriesController();
