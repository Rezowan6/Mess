import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";

import { SubscriptionService } from "./subscription.service.js";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";

const service = new SubscriptionService();

export class SubscriptionController {
  /**
   * Create Subscription
   * Tenant buy plan
   */
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, } = getTenantContext(req);

    const result = await service.create({
      tenantId,

      planId: req.body.planId,
    });

    sendResponse(res, {
      statusCode: 201,

      message: "Subscription created successfully.",

      data: result,
    });
  });

  /**
   * Get Single Subscription
   */
  getById = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getById(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,

      message: "Subscription retrieved successfully.",

      data: result,
    });
  });

  /**
   * Get Tenant Subscription History
   */
  getTenantSubscriptions = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const result = await service.getTenantSubscriptions(tenantId);

    sendResponse(res, {
      statusCode: 200,

      message: "Subscriptions retrieved successfully.",

      data: result,
    });
  });

  /**
   * Current Active Subscription
   */
  getCurrent = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const result = await service.getCurrentSubscription(tenantId);

    sendResponse(res, {
      statusCode: 200,

      message: "Current subscription retrieved successfully.",

      data: result,
    });
  });

  /**
   * Activate Subscription
   * Payment success callback will call this
   */
  activate = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.activate(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,

      message: "Subscription activated successfully.",

      data: result,
    });
  });

  /**
   * Cancel Subscription
   */
  cancel = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.cancel(Number(req.params.id));

    sendResponse(res, {
      statusCode: 200,

      message: "Subscription cancelled successfully.",

      data: result,
    });
  });
}
