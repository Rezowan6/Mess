export const ROLES = {
  SYSTEM_OWNER: "system_owner",
  ADMIN: "admin",
  MANAGER: "manager",
  MEMBER: "member",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
