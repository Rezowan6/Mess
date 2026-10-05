import { Request, Response } from "express";

import { sendResponse } from "@/utils/sendResponse.utils.js";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { noticeService } from "./notice.service.js";

export class NoticeController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const result = await noticeService.create(
      tenantId,
      userId,
      mealSessionId,
      req.body,
    );

    sendResponse(res, {
      statusCode: 201,
      message: "Notice created successfully.",
      data: result,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const result = await noticeService.getAll(tenantId, mealSessionId);

    sendResponse(res, {
      statusCode: 200,
      message: "Notices retrieved successfully.",
      data: result,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const id = Number(req.params.id);

    const result = await noticeService.findById(id, tenantId);

    sendResponse(res, {
      statusCode: 200,
      message: "Notice retrieved successfully.",
      data: result,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);
    const id = Number(req.params.id);

    const result = await noticeService.update(id, tenantId, req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Notice updated successfully.",
      data: result,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);
    const id = Number(req.params.id);

    await noticeService.delete(id, tenantId);

    sendResponse(res, {
      statusCode: 200,
      message: "Notice deleted successfully.",
      data: null,
    });
  });
}
