import { MemberShipRole } from "@/middlewares/role.middleware.js";
import { IMealSessionReq } from "@/modules/mealSession/mealSession.interface.js";
import { ApiError } from "@/utils/ApiError.js";

export interface AuthRequest {
  context: {
    user: {
      id: number;
      email: string;
    };

    membership: {
      id: number;
      tenantId: number;
      role: MemberShipRole;
    };
    mealSession: IMealSessionReq;
  };
}

export const getTenantContext = (req: AuthRequest) => {
  const { context } = req;

  if (!context?.membership || !context?.user || !context?.mealSession) {
    throw new ApiError(400, "Tenant context not found");
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
