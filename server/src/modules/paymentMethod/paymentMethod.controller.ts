import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import type { Request, Response } from "express";
import { paymentMethodService } from "./paymentMethod.service.js";

class PaymentMethodController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const paymentMethod = await paymentMethodService.createPaymentMethod({
      ...req.body,
      tenantId,
      userId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Payment method created successfully.",
      data: paymentMethod,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const paymentMethods = await paymentMethodService.getPaymentMethods(
      tenantId,
      userId,
    );

    return sendResponse(res, {
      statusCode: 200,
      message: "Payment methods fetched successfully.",
      data: paymentMethods,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);
    const id = Number(req.params.id);

    const paymentMethod = await paymentMethodService.updatePaymentMethod(
      id,
      tenantId,
      userId,
      req.body,
    );

    return sendResponse(res, {
      statusCode: 200,
      message: "Payment method updated successfully.",
      data: paymentMethod,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);
    const id = Number(req.params.id);

    await paymentMethodService.deletePaymentMethod(id, tenantId, userId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Payment method deleted successfully.",
      data: null,
    });
  });
}

export const paymentMethodController = new PaymentMethodController();
