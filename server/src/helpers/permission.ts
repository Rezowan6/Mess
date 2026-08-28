import { MemberRole } from "@/constans/index.js";
import { access } from "@/middlewares/access.middleware.js";
import { auth } from "@/middlewares/auth.middleware.js";
import { systemOwner } from "@/middlewares/systemOwner.middleware.js";

type MemberRoleType = (typeof MemberRole)[keyof typeof MemberRole];

export const allMemberRole = Object.values(MemberRole) as MemberRoleType[];

export const systemOwnerAccess = [auth, systemOwner];

export const adminAccess = access({
  roles: [MemberRole.ADMIN],
});
export const managerAccess = access({
  roles: [MemberRole.MANAGER],
});

export const adminAndManagerAccess = access({
  roles: [MemberRole.ADMIN, MemberRole.MANAGER],
});

export const mealSessionAdminAndManagerAccess = access({
  roles: [MemberRole.ADMIN, MemberRole.MANAGER],
  requireMealSession: false,
});
export const allAccess = access({
  roles: [...allMemberRole],
});
