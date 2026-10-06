import { MemberRole } from "@/constans/index.js";

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
  invitedBy: number;
  joinedAt: Date;
}

export interface FindByTenantAndUserPayload {
  tenantId: number;
  userId: number;
}

export interface IUpdateRolePayload {
  id: number;
  role: MemberShipRole;
  tenantId: number;
  mealSessionId: number;
  userId: number;
  currentMembershipId: number;
  currentRole: string;
}
export interface IDeleteMemberPayload {
  tenantId: number;
  currentMembershipId: number;
  currentRole: string;
  targetMembershipId: number;
}

export interface updateRoleDTO {
  targetMembershipId: number;
  newRole: MemberShipRole;
}

export const MEMBER_MANAGER_ROLES: readonly MemberShipRole[] = [
  MemberRole.ADMIN,
  MemberRole.MANAGER,
];

export type MemberManagementAction = "UPDATE_ROLE" | "REMOVE";
export const MAX_MANAGERS_PER_TENANT = 4;
export const MEMBER_MANAGEMENT_MESSAGES: Record<
  MemberManagementAction,
  { forbidden: string; self: string; admin: string }
> = {
  UPDATE_ROLE: {
    forbidden: "Only admin or manager can update member roles.",
    self: "You cannot change your own role.",
    admin: "Admin role cannot be updated.",
  },
  REMOVE: {
    forbidden: "Only admin or manager can remove members.",
    self: "You cannot remove yourself.",
    admin: "The admin cannot be removed.",
  },
};

export interface IManageableTargetParams {
  tenantId: number; // use the same type as your existing payloads
  currentMembershipId: number;
  targetMembershipId: number;
  action: MemberManagementAction;
}
