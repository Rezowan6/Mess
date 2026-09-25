import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getAppDate } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { eggService } from "./egg.service.js";

class EggController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const egg = await eggService.create({
      tenantId,
      mealSessionId,
      createdBy: userId,
      eggDate: getAppDate(),
      ...req.body,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Egg record created successfully",
      data: egg,
    });
  });

  // unnessary future delete korte hobe
  getMemberEggs = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const egg = await eggService.getMemberEggs({
      tenantId,
      mealSessionId,
      memberId: Number(req.params.memberId),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Member egg records fetched successfully",
      data: egg,
    });
  });

  getAllEggs = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const eggs = await eggService.getAllEggs({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "All egg records fetched successfully",
      data: eggs,
    });
  });

  getEggSummary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const summary = await eggService.getEggSummary({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Egg summary fetched successfully",
      data: summary,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const egg = await eggService.update({
      id: Number(req.params.id),
      tenantId,
      mealSessionId,
      memberId: Number(req.body.memberId),
      eggDate: getAppDate(req.query.date as string),
      data: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Egg record updated successfully",
      data: egg,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    await eggService.delete({
      id: Number(req.params.id),
      tenantId,
      mealSessionId,
      memberId: Number(req.body.memberId),
      eggDate: getAppDate(req.query.date as string),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Egg record deleted successfully",
      data: null,
    });
  });
}

export const eggController = new EggController();
