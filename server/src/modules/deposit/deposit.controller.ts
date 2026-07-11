import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getCurrentDate } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { depositService } from "../containers/deposit.container.js";

export class DepositController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const depositDate = getCurrentDate();

    const deposit = await depositService.createDeposit({
      tenantId,
      createdBy: userId,
      depositDate,
      ...req.body,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Deposit create successfully",
      data: deposit,
    });
  });

  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const deposits = await depositService.getAllDeposits(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposits fetched successfully",
      data: deposits,
    });
  });

  // deposit.controller.ts

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const deposit = await depositService.getDepositById({
      tenantId,
      depositId: Number(req.params.id),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposit fetched successfully",
      data: deposit,
    });
  });
}
