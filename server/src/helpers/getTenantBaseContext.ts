import { ApiError } from "@/utils/ApiError.js";
import type { Request } from "express";

export const getTenantBaseContext = (req: Request) => {
  const { context } = req;

  if (!context?.membership || !context?.user) {
    throw new ApiError(400, "Tenant context not found");
  }

  return {
    tenantId: context.membership.tenantId,
    userId: context.user.id,
    role: context.membership.role,
    membershipId: context.membership.id,
  };
};
