import { HEADERS, MemberStatus, TenantStatus } from "@/constans/index.js";

import { Tenant, TenantMembership } from "@/models/index.js";

import { ApiError } from "@/utils/index.js";

import { NextFunction, Request, Response } from "express";

export const contextMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const tenantIdHeader = req.get(HEADERS.TENANT_ID);

  const tenantId = Number(tenantIdHeader);

  if (!tenantIdHeader || !Number.isInteger(tenantId) || tenantId <= 0) {
    throw new ApiError(400, "Valid Tenant ID is required.");
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

  const { id, name, email, role } = req.user;

  req.context = {
    user: {
      id,
      name,
      email,
      role,
    },

    membership,
    tenant: membership.tenant,
    mealSession: undefined,
  };

  next();
};
