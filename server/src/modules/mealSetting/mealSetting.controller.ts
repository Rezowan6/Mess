import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { mealSettingService } from "./mealSetting.service.js";

export class MealSettingController {
  create = asyncHandler(async (req, res) => {
    const { tenantId } = getTenantContext(req);

    const result = await mealSettingService.create({
      tenantId,
      ...req.body,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Meal setting created successfully.",
      data: result,
    });
  });

  getMySetting = asyncHandler(async (req, res) => {
    const { tenantId } = getTenantContext(req);

    const result = await mealSettingService.getMySetting(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal setting fetched successfully.",
      data: result,
    });
  });

  update = asyncHandler(async (req, res) => {
    const { tenantId } = getTenantContext(req);

    const result = await mealSettingService.update(tenantId, req.body);

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal setting updated successfully.",
      data: result,
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { tenantId } = getTenantContext(req);

    await mealSettingService.delete(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal setting deleted successfully.",
      data: null,
    });
  });
}

export const mealSettingController = new MealSettingController();
