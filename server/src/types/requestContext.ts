import { MemberShipRole } from "@/middlewares/role.middleware.js";

export interface RequestContext {
  user: {
    id: number;
    email: string;
  };

  membership: {
    id: number;
    tenantId: number;
    role: MemberShipRole;
  };

  tenant: {
    id: number;
    name?: string;
  };
}
