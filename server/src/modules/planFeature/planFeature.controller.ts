import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";

import { PlanFeatureService } from "./planFeature.service.js";

const service = new PlanFeatureService();

export class PlanFeatureController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Plan feature assigned successfully.",
      data: result,
    });
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await service.getAll();

    sendResponse(res, {
      statusCode: 200,
      message: "Plan features retrieved successfully.",
      data: result,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getById(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,
      message: "Plan feature retrieved successfully.",
      data: result,
    });
  });

  getByPlanId = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getByPlanId(Number(req.params.planId));

    sendResponse(res, {
      statusCode: 200,
      message: "Plan features retrieved successfully.",
      data: result,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.update(Number(req.params.id), req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Plan feature updated successfully.",
      data: result,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await service.delete(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,
      message: "Plan feature deleted successfully.",
      data: null,
    });
  });
}
