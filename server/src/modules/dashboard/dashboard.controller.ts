import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { dashboardService } from "./dashboard.service.js";

class DashboardController {
  getTodayDashboard = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const result = await dashboardService.getTodayDashboard(
      tenantId,
      mealSessionId,
    );

    return sendResponse(res, {
      statusCode: 200,
      message: "Manager dashboard data retrieved successfully.",
      data: result,
    });
  });

  getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const result = await dashboardService.getDashboardStats(
      tenantId,
      mealSessionId,
    );

    return sendResponse(res, {
      statusCode: 200,
      message: "Manager dashboard stats data retrieved successfully.",
      data: result,
    });
  });
}

export const dashboardController = new DashboardController();
