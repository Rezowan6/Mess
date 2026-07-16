import type { Role } from "../constants/roles";

export const hasRole = (userRole: string | undefined, allowedRoles: Role[]) => {
  if (!userRole) return false;

  return allowedRoles.includes(userRole as Role);
};
