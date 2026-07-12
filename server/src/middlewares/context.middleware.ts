import { MemberStatus, TenantStatus } from "@/constans/index.js";
import { Tenant, TenantMembership } from "@/models/index.js";
import { mealSessionRepository } from "@/modules/containers/mealSession.container.js";
import { MealSessionStatus } from "@/modules/mealSession/mealSession.interface.js";
import { ApiError } from "@/utils/index.js";
import { NextFunction, Request, Response } from "express";

export const contextMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const membership = await TenantMembership.findOne({
    where: {
      userId: req.user.id,
      status: MemberStatus.ACTIVE,
    },
    include: [
      {
        model: Tenant,
        as: "tenant",
      },
    ],
  });

  if (!membership) {
    throw new ApiError(403, "Active membership not found.");
  }

  if (!membership.tenant) {
    throw new ApiError(404, "Tenant not found.");
  }

  if (membership.tenant.status !== TenantStatus.ACTIVE) {
    throw new ApiError(403, "Tenant is inactive.");
  }

  const mealSession = await mealSessionRepository.getCurrentSession(
    membership.tenantId,
  );

  if (!mealSession || mealSession.status !== MealSessionStatus.OPEN) {
    throw new ApiError(404, "Open meal session not found.");
  }

  req.context = {
    user: req.user,
    membership,
    tenant: membership.tenant,
    mealSession,
  };

  next();
};
