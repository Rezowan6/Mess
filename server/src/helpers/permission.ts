import { MemberRole } from "@/constans/index.js";
import { auth, contextMiddleware, role } from "@/middlewares/index.js";

const allMemberRole = Object.values(MemberRole);

export const managerAccess = [auth, contextMiddleware, role(MemberRole.ADMIN)];
export const allAccess = [auth, contextMiddleware, role(...allMemberRole)];
