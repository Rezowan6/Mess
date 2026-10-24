import { getIdParam } from "@/helpers/getIdParam.helper.js";
import { getTenantOnlyContext } from "@/helpers/getTenantOnlyContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getCurrentMonthAndYear } from "@/utils/date.util.js";
import { getPaginationQuery } from "@/utils/pagination.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { currentBillService } from "./currentBill.service.js";

class CurrentBillController {
  getMemberCurrentBills = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantOnlyContext(req);

    const query = getPaginationQuery(req);

    const { month, year } = getCurrentMonthAndYear();

    const currentBills = await currentBillService.getMembercurrentBills({
      tenantId,
      month: Number(month),
      year: Number(year),
      query,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Current bills fetched successfully.",
      data: currentBills.data,
      meta: currentBills.meta,
    });
  });

  getDeletedCurrentBills = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantOnlyContext(req);

    const currentBills =
      await currentBillService.getDeletedCurrentBills(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Deleted current bills fetched successfully.",
      data: currentBills,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantOnlyContext(req);
    const id = getIdParam(req);

    const { year } = getCurrentMonthAndYear();

    const currentBill = await currentBillService.getById({
      tenantId,
      userId: id,
      year: Number(year),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Current-bill fetched successfully",
      data: currentBill,
    });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantOnlyContext(req);

    // req.body is already validated and holds only the allowed fields
    await currentBillService.create({
      ...req.body,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Current-bill create successfully",
      data: null,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantOnlyContext(req);
    const id = getIdParam(req);

    await currentBillService.update({
      ...req.body,
      id,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Current-bill update successfully",
      data: null,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantOnlyContext(req);
    const id = getIdParam(req);

    await currentBillService.delete({
      id,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Current-bill deleted successfully",
      data: null,
    });
  });

  restore = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantOnlyContext(req);
    const id = getIdParam(req);

    await currentBillService.restore({
      id,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Current-bill restored successfully",
      data: null,
    });
  });
}

export const currentBillController = new CurrentBillController();
