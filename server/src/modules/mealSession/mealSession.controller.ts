import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { MealSessionService } from "./MealSession.service.js";

export class MealSessionController {
    static create = asyncHandler(async (req: Request, res: Response) => {
        const {tenantId, userId} = getTenantContext(req);

        await MealSessionService.create(tenantId, userId);

        return sendResponse(res, {
            statusCode: 201,
            message: "Meal session create successfully",
            data: null,
        })
    })
}