import { MemberShipRole } from "@/middlewares/role.middleware.js";
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
  };
}

export const getTenantContext = (req: AuthRequest) => {
  const { context } = req;

  if (!context?.membership || !context?.user) {
    throw new ApiError(400, "Tenant context not found");
  }

  const { membership, user } = context;

  return {
    tenantId: membership.tenantId,
    userId: user.id,
    role: membership.role,
    membershipId: membership.id,
  };
};
