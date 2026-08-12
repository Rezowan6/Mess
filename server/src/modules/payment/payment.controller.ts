import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";

import { ApiError } from "@/utils/ApiError.js";
import { PaymentService } from "./payment.service.js";

const service = new PaymentService();

export class PaymentController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const result = await service.create({
      tenantId,
      ...req.body,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Payment created successfully.",
      data: result,
    });
  });

  webhook = asyncHandler(async (req: Request, res: Response) => {
    const gatewayName = req.params.gateway as string;

    if (!gatewayName) {
      throw new ApiError(400, "Payment gateway is required.");
    }

    const result = await service.webhook(gatewayName, req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Payment webhook processed successfully.",
      data: result,
    });
  });

  verify = asyncHandler(async (req: Request, res: Response) => {
    const paymentId = Number(req.params.id);

    if (!Number.isInteger(paymentId) || paymentId <= 0) {
      throw new ApiError(400, "Invalid payment ID.");
    }

    const result = await service.verifyPayment(paymentId);

    sendResponse(res, {
      statusCode: 200,
      message: "Payment verified successfully.",
      data: result,
    });
  });

  getMyPayments = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const result = await service.getMyPayments(tenantId);

    sendResponse(res, {
      statusCode: 200,
      message: "Payments retrieved successfully.",
      data: result,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getById(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,
      message: "Payment retrieved successfully.",
      data: result,
    });
  });

  markAsSuccess = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.markAsSuccess(
      Number(req.params.id),
      req.body.transactionId,
    );

    sendResponse(res, {
      statusCode: 200,
      message: "Payment marked as success.",
      data: result,
    });
  });

  markAsFailed = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.markAsFailed(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,
      message: "Payment marked as failed.",
      data: result,
    });
  });

  markAsCancelled = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.markAsCancelled(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,
      message: "Payment marked as cancelled.",
      data: result,
    });
  });

  getPendingPayments = asyncHandler(async (_req: Request, res: Response) => {
    const result = await service.getPendingPayments();

    sendResponse(res, {
      statusCode: 200,
      message: "Pending payments retrieved successfully.",
      data: result,
    });
  });

  getProcessingPayments = asyncHandler(async (_req: Request, res: Response) => {
    const result = await service.getProcessingPayments();

    sendResponse(res, {
      statusCode: 200,
      message: "Processing payments retrieved successfully.",
      data: result,
    });
  });
}
