import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getCurrentDate } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { depositService } from "../containers/deposit.container.js";

export class DepositController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const depositDate = getCurrentDate();

    const deposit = await depositService.createDeposit({
      tenantId,
      createdBy: userId,
      depositDate,
      mealSessionId,
      ...req.body,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Deposit create successfully",
      data: deposit,
    });
  });

  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const deposits = await depositService.getAllDeposits(tenantId, mealSessionId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposits fetched successfully",
      data: deposits,
    });
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const deposit = await depositService.getDepositById({
      tenantId,
      mealSessionId,
      depositId: Number(req.params.id),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposit fetched successfully",
      data: deposit,
    });
  });
}
