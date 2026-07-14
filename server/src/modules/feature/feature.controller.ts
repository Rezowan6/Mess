import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";

import { FeatureService } from "./feature.service.js";

const service = new FeatureService();

export class FeatureController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Feature created successfully.",
      data: result,
    });
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await service.getAll();

    sendResponse(res, {
      statusCode: 200,
      message: "Features retrieved successfully.",
      data: result,
    });
  });

  getActiveFeatures = asyncHandler(async (_req: Request, res: Response) => {
    const result = await service.getActiveFeatures();

    sendResponse(res, {
      statusCode: 200,
      message: "Active features retrieved successfully.",
      data: result,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getById(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,
      message: "Feature retrieved successfully.",
      data: result,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.update(Number(req.params.id), req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Feature updated successfully.",
      data: result,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await service.delete(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,
      message: "Feature deleted successfully.",
      data: null,
    });
  });
}
