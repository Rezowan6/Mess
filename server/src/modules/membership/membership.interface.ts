export const MEMBER_SHIP_ROLE = [
  "systemOwner",
  "admin",
  "manager",
  "member",
  "messMalik",
] as const;

export type MemberShipRole = (typeof MEMBER_SHIP_ROLE)[number];

export const MEMBER_SHIP_STATUS = [
  "active",
  "invited",
  "inactive",
  "left",
  "removed",
] as const;

export type MemberShipStatus = (typeof MEMBER_SHIP_STATUS)[number];

export interface MembershipCreationAttributes {
  tenantId: number;
  userId: number;
  role: MemberShipRole;
  status: MemberShipStatus;
}

export interface FindByTenantAndUserPayload {
  tenantId: number;
  userId: number;
}
