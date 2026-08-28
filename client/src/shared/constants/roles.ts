export const ROLES = {
  SYSTEM_OWNER: "systemOwner",
  ADMIN: "admin",
  MANAGER: "manager",
  MEMBER: "member",
  MESS_MALIK: "messMalik",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
