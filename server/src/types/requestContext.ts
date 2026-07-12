import { MemberShipRole } from "@/middlewares/role.middleware.js";
import { MealSessionStatus } from "@/modules/mealSession/mealSession.interface.js";

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
  mealSession: {
    id: number;
    tenantId: number;
    month: number;
    year: number;
    status: MealSessionStatus
  };
}
