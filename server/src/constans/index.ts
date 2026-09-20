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

export const HEADERS = {
  TENANT_ID: "X-Tenant-ID",
  MEAL_SESSION_ID: "X-Meal-Session-ID",
} as const;

export const FeatureCode = {
  DASHBOARD: "dashboard",
  ADVANCED_REPORT: "advanced_report",
  EXPENSE_MANAGEMENT: "Expense Management",
} as const;

export type FeatureCode = (typeof FeatureCode)[keyof typeof FeatureCode];
