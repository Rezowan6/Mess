import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { depositService } from "../containers/deposit.container.js";
import { getCurrentDate } from "@/utils/date.util.js";

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
}
