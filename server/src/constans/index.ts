export const InviteStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  EXPIRED: "expired",
  REVOKED: "revoked",
  CANCELLED: "cancelled",
} as const;

export const MemberRole = {
  SYSTEM_OWNER: "systemOwner",
  ADMIN: "admin",
  MANAGER: "manager",
  MEMBER: "member",
  MESS_MALIK: "messMalik",
} as const;

export const MemberStatus = {
  ACTIVE: "active",
  INVITED: "invited",
  INACTIVE: "inactive",
  REMOVED: "removed",
} as const;

export const TenantStatus = {
  ACTIVE: "active",
  INVITED: "inactive",
  SUSPENDED: "suspended",
};
