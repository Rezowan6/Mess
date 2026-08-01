import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { monthlyCalculationService } from "./monthlyCalculation.service.js";

class MonthlyCalculationController {
   getCurrentMonthCalculation = asyncHandler(
    async (req: Request, res: Response) => {
      const { mealSessionId, tenantId, session } = getTenantContext(req);

      const data = await monthlyCalculationService.getCurrentMonthCalculation({
        tenantId,
        mealSessionId,
        session,
      });

      return sendResponse(res, {
        statusCode: 200,
        message: "Monthly calculation retrieved successfully.",
        data,
      });
    },
  );
}

export const monthlyCalculationController = new MonthlyCalculationController();
