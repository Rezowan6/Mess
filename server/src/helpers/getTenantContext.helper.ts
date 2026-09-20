import { MemberShipRole } from "@/middlewares/role.middleware.js";
import { IMealSessionReq } from "@/modules/mealSession/mealSession.interface.js";
import { IGetTenantContentRes } from "@/types/requestContext.js";
import { ApiError } from "@/utils/ApiError.js";
import { Request } from "express";

// getTenantSessionContext()
export const getTenantContext = (req: Request): IGetTenantContentRes => {
  const { context } = req;

  if (!context?.membership || !context?.user) {
    throw new ApiError(400, "Tenant context not found.");
  }

  if (!context.mealSession) {
    throw new ApiError(400, "Meal session context not found.");
  }

  const { membership, user, mealSession } = context;

  return {
    tenantId: membership.tenantId,
    userId: user.id,
    role: membership.role,
    membershipId: membership.id,

    mealSessionId: mealSession.id,

    session: {
      id: mealSession.id,
      month: mealSession.month,
      year: mealSession.year,
      status: mealSession.status,
      tenantId: mealSession.tenantId,
    },
  };
};
