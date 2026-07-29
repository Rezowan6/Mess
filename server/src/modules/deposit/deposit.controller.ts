import { IPaginationQuery } from "@/common/types/pagination.interface.js";
import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getCurrentDate } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { depositService } from "./deposit.service.js";

class DepositController {
  create = asyncHandler(async (req: Request, res: Response) => {
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

  summary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const summary = await depositService.getSummary({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposit summary fetched successfully",
      data: summary,
    });
  });

  getDeposits = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const query = req.query as IPaginationQuery;

    const deposits = await depositService.getDeposits({
      tenantId,
      mealSessionId,
      query,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposits fetched successfully",
      data: deposits.data,
      meta: deposits.meta,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
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

  getMemberDeposits = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const deposits = await depositService.getMemberDeposits({
      tenantId,
      mealSessionId,
      memberId: Number(req.params.memberId),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Member deposits fetched successfully",
      data: deposits,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const deposit = await depositService.updateDeposit({
      tenantId,
      mealSessionId,
      depositId: Number(req.params.id),
      payload: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposit updated successfully",
      data: deposit,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    await depositService.deleteDeposit({
      tenantId,
      mealSessionId,
      depositId: Number(req.params.id),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Deposit deleted successfully",
      data: null,
    });
  });
}

export const depositController = new DepositController();
