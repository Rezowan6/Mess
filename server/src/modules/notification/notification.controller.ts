import { Request, Response } from "express";

import { sendResponse } from "@/utils/sendResponse.utils.js";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";

import { notificationService } from "./notification.service.js";
import { getIdParam } from "@/helpers/getIdParam.helper.js";

class NotificationController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const result = await notificationService.getAll(tenantId, userId, {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Notifications retrieved successfully.",
      data: result,
    });
  });

  getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const result = await notificationService.getUnreadCount(tenantId, userId);

    sendResponse(res, {
      statusCode: 200,
      message: "Unread notification count retrieved successfully.",
      data: result,
    });
  });

  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const id = getIdParam(req);

    await notificationService.markAsRead(id, tenantId, userId);

    sendResponse(res, {
      statusCode: 200,
      message: "Notification marked as read.",
      data: null,
    });
  });

  markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    await notificationService.markAllAsRead(tenantId, userId);

    sendResponse(res, {
      statusCode: 200,
      message: "All notifications marked as read.",
      data: null,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const id = getIdParam(req);

    await notificationService.delete(id, tenantId, userId);

    sendResponse(res, {
      statusCode: 200,
      message: "Notification deleted successfully.",
      data: null,
    });
  });
}

export const notificationController = new NotificationController();
