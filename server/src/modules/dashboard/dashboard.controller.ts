import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service.js";


export class DashboardController {
    static getManagerDashboard = asyncHandler(async (req: Request, res: Response) => {
        const {tenantId, mealSessionId, session} = getTenantContext(req);

        const result = await DashboardService.getManagerDashboard(tenantId, mealSessionId, session);

        return sendResponse(res, {
            statusCode: 200,
            message: "Manager dashboard data retrieved successfully.",
            data: result,
        })
    })
}