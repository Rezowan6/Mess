import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { eggRateService } from "./eggRate.service.js";

class EggRateController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const eggRate = await eggRateService.create({
      ...req.body,
      tenantId,
      mealSessionId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Egg rate created successfully",
      data: eggRate,
    });
  });

  get = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const eggRate = await eggRateService.get({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Egg rate fetched successfully",
      data: eggRate,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const eggRate = await eggRateService.update({
      tenantId,
      mealSessionId,
      data: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Egg rate updated successfully",
      data: eggRate,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    await eggRateService.delete({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Egg rate deleted successfully",
      data: null,
    });
  });
}

export const eggRateController = new EggRateController();
