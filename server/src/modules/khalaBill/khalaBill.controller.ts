import { getIdParam } from "@/helpers/getIdParam.helper.js";
import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getCurrentMonthAndYear } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { khalaBillService } from "./khalaBill.service.js";

class KhalaBillController {
  getMemberKhalaBills = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const { month, year } = getCurrentMonthAndYear();

    const khalaBill = await khalaBillService.getMemberKhalaBills({
      tenantId,
      month: Number(month),
      year: Number(year),
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Khala-bill fetched successfully",
      data: khalaBill,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);
    const id = getIdParam(req);

    const { year } = getCurrentMonthAndYear();

    const khalaBill = await khalaBillService.getById({
      tenantId,
      userId: id,
      year: Number(year),
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Khala-bill fetched successfully",
      data: khalaBill,
    });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const deposit = await khalaBillService.create({
      ...req.body,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Khala-bill create successfully",
      data: deposit,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);
    const id = getIdParam(req);

    const khalaBill = await khalaBillService.update({
      id,
      ...req.body,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Khala-bill update successfully",
      data: khalaBill,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);
    const id = getIdParam(req);

    const khalaBill = await khalaBillService.delete({
      id,
      tenantId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Khala-bill deleted successfully",
      data: khalaBill,
    });
  });
}

export const khalaBillController = new KhalaBillController();
