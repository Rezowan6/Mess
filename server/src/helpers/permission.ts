import { MemberRole } from "@/constans/index.js";
import { auth, contextMiddleware, role } from "@/middlewares/index.js";

export const managerAccess = [auth, contextMiddleware, role(MemberRole.ADMIN)];
