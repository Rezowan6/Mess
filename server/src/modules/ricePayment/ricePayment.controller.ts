import { Request, Response } from "express";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import { asyncHandler } from "@/middlewares/index.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import {
  ICreateRicePaymentDto,
  IUpdateRicePaymentDto,
} from "./ricePayment.interface.js";
import { ricePaymentService } from "./ricePayment.service.js";

class RicePaymentController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const payment = await ricePaymentService.create({
      ...req.body,
      tenantId,
      createdBy: req.user!.id,
    } as ICreateRicePaymentDto);

    sendResponse(res, {
      statusCode: 201,
      message: "Rice payment created successfully.",
      data: payment,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const payment = await ricePaymentService.getById({
      tenantId,
      mealSessionId: Number(req.params.mealSessionId),
      riceId: Number(req.params.riceId),
      id: Number(req.params.id),
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Rice payment fetched successfully.",
      data: payment,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const payments = await ricePaymentService.getAll({
      tenantId,
      mealSessionId: Number(req.params.mealSessionId),
      riceId: Number(req.params.riceId),
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Rice payments fetched successfully.",
      data: payments,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    await ricePaymentService.update({
      tenantId,
      mealSessionId: Number(req.params.mealSessionId),
      riceId: Number(req.params.riceId),
      id: Number(req.params.id),
      data: req.body as IUpdateRicePaymentDto,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Rice payment updated successfully.",
      data: null,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    await ricePaymentService.delete({
      tenantId,
      mealSessionId: Number(req.params.mealSessionId),
      riceId: Number(req.params.riceId),
      id: Number(req.params.id),
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Rice payment deleted successfully.",
      data: null,
    });
  });

  getTotalPaid = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const totalPaid = await ricePaymentService.getTotalPaid({
      tenantId,
      mealSessionId: Number(req.params.mealSessionId),
      riceId: Number(req.params.riceId),
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Total rice payment fetched successfully.",
      data: totalPaid,
    });
  });

  getRemainingDue = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const remainingDue = await ricePaymentService.getRemainingDue({
      tenantId,
      mealSessionId: Number(req.params.mealSessionId),
      riceId: Number(req.params.riceId),
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Remaining rice payment due fetched successfully.",
      data: remainingDue,
    });
  });
}

export const ricePaymentController = new RicePaymentController();
