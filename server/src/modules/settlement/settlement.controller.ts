import { getIdParam } from "@/helpers/getIdParam.helper.js";
import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import type { Request, Response } from "express";
import { settlementService } from "./settlement.service.js";

class SettlementController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const settlement = await settlementService.createSettlement({
      ...req.body,
      tenantId,
      mealSessionId,
      initiatedBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Settlement created successfully.",
      data: settlement,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const settlements = await settlementService.getSettlements({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Settlements fetched successfully.",
      data: settlements,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);
    const id = getIdParam(req);

    const settlement = await settlementService.getSettlementById(id, {
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Settlement fetched successfully.",
      data: settlement,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);
    const id = getIdParam(req);

    const settlement = await settlementService.updateSettlement(id, req.body, {
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Settlement updated successfully.",
      data: settlement,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);
    const id = getIdParam(req);

    await settlementService.deleteSettlement(id, {tenantId, mealSessionId});

    return sendResponse(res, {
      statusCode: 200,
      message: "Settlement deleted successfully.",
      data: null,
    });
  });
}

export const settlementController = new SettlementController();
