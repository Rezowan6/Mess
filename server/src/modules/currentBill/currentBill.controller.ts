import { getIdParam } from "@/helpers/getIdParam.helper.js";
import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getCurrentMonthAndYear } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { currentBillService } from "./currentBill.service.js";

class CurrentBillController {
  getMemberCurrentBills = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const { month, year } = getCurrentMonthAndYear();

    const currentBill = await currentBillService.getMembercurrentBills({
      tenantId,
      month: Number(month),
      year: Number(year),
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Current-bill fetched successfully",
      data: currentBill,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);
    const id = getIdParam(req);

    const { year } = getCurrentMonthAndYear();

    const currentBill = await currentBillService.getById({
      tenantId,
      userId: id,
      year: Number(year),
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Current-bill fetched successfully",
      data: currentBill,
    });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const deposit = await currentBillService.create({
      ...req.body,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Current-bill create successfully",
      data: deposit,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);
    const id = getIdParam(req);

    const currentBill = await currentBillService.update({
      id,
      ...req.body,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Current-bill update successfully",
      data: currentBill,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);
    const id = getIdParam(req);

    const currentBill = await currentBillService.delete({
      id,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Current-bill deleted successfully",
      data: currentBill,
    });
  });
}

export const currentBillController = new CurrentBillController();
