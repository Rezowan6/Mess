import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { riceService } from "./rice.service.js";

class RiceController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const rice = await riceService.create({
      ...req.body,
      tenantId,
      mealSessionId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Rice purchase created successfully",
      data: rice,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);
    const { id } = req.params;

    const rice = await riceService.getById({
      tenantId,
      mealSessionId,
      id: Number(id),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Rice purchase fetched successfully",
      data: rice,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const page = Math.max(1, Math.floor(Number(req.query.page)) || 1);

    const limit = Math.min(
      100,
      Math.max(1, Math.floor(Number(req.query.limit)) || 10),
    );

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim().slice(0, 100)
        : "";

    const result = await riceService.getAll({
      tenantId,
      mealSessionId,
      page,
      limit,
      ...(search && { search }),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Rice purchases fetched successfully",
      data: result.data,
      meta: result.meta,
      extra: { dueSummary: result.dueSummary },
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);
    const { id } = req.params;

    const rice = await riceService.update({
      tenantId,
      mealSessionId,
      id: Number(id),
      data: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Rice purchase updated successfully",
      data: rice,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);
    const { id } = req.params;

    await riceService.delete({
      tenantId,
      mealSessionId,
      id: Number(id),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Rice purchase deleted successfully",
      data: null,
    });
  });

  getSummary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const summary = await riceService.getSummary({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Rice summary fetched successfully",
      data: summary,
    });
  });

  getRemainingDue = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);
    const { id } = req.params;

    const remainingDue = await riceService.getRemainingDue({
      tenantId,
      mealSessionId,
      id: Number(id),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Rice remaining due fetched successfully",
      data: remainingDue,
    });
  });

  bulkSettleDue = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);
    const { paymentMethod, paymentDate, note } = req.body;

    const result = await riceService.bulkSettleDue({
      tenantId,
      mealSessionId,
      createdBy: userId,
      paymentMethod,
      paymentDate,
      note,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Rice dues settled successfully",
      data: result,
    });
  });
}

export const riceController = new RiceController();
