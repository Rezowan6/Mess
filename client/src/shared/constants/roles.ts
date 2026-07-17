export const ROLES = {
  SYSTEM_OWNER: "system_owner",
  ADMIN: "admin",
  MANAGER: "manager",
  MEMBER: "member",
  MESS_MALIK: "mess_malik",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
