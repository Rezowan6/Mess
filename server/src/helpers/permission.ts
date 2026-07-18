import { MemberRole } from "@/constans/index.js";
import { auth, contextMiddleware, role } from "@/middlewares/index.js";

const allMemberRole = Object.values(MemberRole);

export const systemOwnerAccess = [auth, contextMiddleware, role(MemberRole.SYSTEM_OWNER)];

export const adminAccess = [auth, contextMiddleware, role(MemberRole.ADMIN)];
export const managerAccess = [auth, contextMiddleware, role(MemberRole.MANAGER)];

export const adminAndManagerAccess = [auth, contextMiddleware, role(MemberRole.MANAGER, MemberRole.ADMIN)];

export const allAccess = [auth, contextMiddleware, role(...allMemberRole)];
