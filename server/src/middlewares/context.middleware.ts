import { HEADERS, MemberStatus, TenantStatus } from "@/constans/index.js";
import { Tenant, TenantMembership } from "@/models/index.js";
import { MealSessionStatus } from "@/modules/mealSession/mealSession.interface.js";
import { mealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";
import { ApiError } from "@/utils/index.js";
import { NextFunction, Request, Response } from "express";

export const contextMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const tenantId = Number(req.headers[HEADERS.TENANT_ID]);
  if (!tenantId) {
    throw new ApiError(400, "Tenant ID is required.");
  }
  const membership = await TenantMembership.findOne({
    where: {
      userId: req.user.id,
      tenantId,
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

  const { id, name, email } = req.user;

  req.context = {
    user: {
      id,
      name,
      email,
    },
    membership,
    tenant: membership.tenant,
    mealSession,
  };

  next();
};
