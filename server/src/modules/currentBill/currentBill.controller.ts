import { getIdParam } from "@/helpers/getIdParam.helper.js";
import { getTenantOnlyContext } from "@/helpers/getTenantOnlyContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { getCurrentMonthAndYear } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { currentBillService } from "./currentBill.service.js";

class CurrentBillController {
  getMemberCurrentBills = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantOnlyContext(req);

    const query = req.query as IPaginationQuery;

    console.log(query)

    const { month, year } = getCurrentMonthAndYear();

    const currentBill = await currentBillService.getMembercurrentBills({
      tenantId,
      month: Number(month),
      year: Number(year),
      query,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Current-bill fetched successfully",
      data: currentBill.data,
      meta: currentBill.meta,
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
      statusCode: 201,
      message: "Current-bill fetched successfully",
      data: currentBill,
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

  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantOnlyContext(req);

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
    const { tenantId, userId } = getTenantOnlyContext(req);
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
    const { tenantId, userId } = getTenantOnlyContext(req);
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
