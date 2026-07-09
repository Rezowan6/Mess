import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { mealEntryService } from "@/modules/containers/mealEntry.container.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";

export class MealEntriesController {
  static my = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId } = getTenantContext(req);

    const data = await mealEntryService.my({ tenantId, userId });

    return sendResponse(res, {
      statusCode: 200,
      message: "My meal featch successfully.",
      data,
    });
  });
}
