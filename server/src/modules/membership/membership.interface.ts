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
  "removed",
] as const;

export type MemberShipStatus = (typeof MEMBER_SHIP_STATUS)[number];
