// import { MemberRole } from "@/constans/index.js";
// import { auth, contextMiddleware, role } from "@/middlewares/index.js";

// const allMemberRole = Object.values(MemberRole);

// export const systemOwnerAccess = [
//   auth,
//   contextMiddleware(),
//   role(MemberRole.SYSTEM_OWNER),
// ];

// export const adminAccess = [auth, contextMiddleware(), role(MemberRole.ADMIN)];
// export const managerAccess = [
//   auth,
//   contextMiddleware(),
//   role(MemberRole.MANAGER),
// ];

// export const adminAndManagerAccess = [
//   auth,
//   contextMiddleware(),
//   role(MemberRole.MANAGER, MemberRole.ADMIN),
// ];

// export const mealSessionAdminAndManagerAccess = [
//   auth,
//   contextMiddleware({ requireMealSession: false }),
//   role(MemberRole.MANAGER, MemberRole.ADMIN),
// ];
// export const allAccess = [auth, contextMiddleware(), role(...allMemberRole)];

import { MemberRole } from "@/constans/index.js";
import { access } from "@/middlewares/access.middleware.js";

type MemberRoleType = (typeof MemberRole)[keyof typeof MemberRole];

export const allMemberRole = Object.values(MemberRole) as MemberRoleType[];

export const systemOwnerAccess = access({
  roles: [MemberRole.SYSTEM_OWNER],
});

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
