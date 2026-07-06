import { MemberStatus, TenantStatus } from "@/constans/index.js";
import { TenantMembership, Tenant } from "@/models/index.js";
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

  req.context = {
    user: req.user,
    membership,
    tenant: membership.tenant,
  }

  next();
};
