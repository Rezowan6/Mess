import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { soldProductService } from "./soldProduct.service.js";

class SoldProductController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const soldProduct = await soldProductService.create({
      ...req.body,
      tenantId,
      mealSessionId,
      createdBy: userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Sold product created successfully",
      data: soldProduct,
    });
  });

  get = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const soldProduct = await soldProductService.get({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Sold product fetched successfully",
      data: soldProduct,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const soldProduct = await soldProductService.update({
      tenantId,
      mealSessionId,
      data: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Sold product updated successfully",
      data: soldProduct,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    await soldProductService.delete({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Sold product deleted successfully",
      data: null,
    });
  });
}

export const soldProductController = new SoldProductController();
