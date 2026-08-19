import type { NextFunction, Request, Response } from "express";

import { ApiError } from "@/utils/ApiError.js";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import { subscriptionAccessService } from "@/modules/subscription/subscriptionAccess.service.js";

export const subscriptionGuard =
  (featureCode: string) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { tenantId } = getTenantContext(req);

      if (!tenantId) {
        throw new ApiError(400, "Tenant context missing.");
      }

      await subscriptionAccessService.requireFeature(tenantId, featureCode);

      next();
    } catch (error) {
      next(error);
    }
  };
