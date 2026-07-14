import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";

import { PlanService } from "./plan.service.js";

const service = new PlanService();

export class PlanController {
   create = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Plan created successfully.",
      data: result,
    });
  });

   getAll = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getAll();

    sendResponse(res, {
      statusCode: 200,
      message: "Plans retrieved successfully.",
      data: result,
    });
  });

   getActivePlans = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getActivePlans();

    sendResponse(res, {
      statusCode: 200,
      message: "Active plans retrieved successfully.",
      data: result,
    });
  });

   getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await service.getById(Number(id));

    sendResponse(res, {
      statusCode: 200,
      message: "Plan retrieved successfully.",
      data: result,
    });
  });

   update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await service.update(Number(id), req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Plan updated successfully.",
      data: result,
    });
  });

   delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await service.delete(Number(id));

    sendResponse(res, {
      statusCode: 200,
      message: "Plan deleted successfully.",
      data: null,
    });
  });
}
