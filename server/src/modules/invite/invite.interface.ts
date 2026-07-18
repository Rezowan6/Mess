import { IGetTenantContentRes } from "@/types/requestContext.js";

export const InviteStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  EXPIRED: "expired",
  REVOKED: "revoked",
  CANCELLED: "cancelled",
} as const;

export const INVITE_STATUS = Object.values(InviteStatus);

export type InviteStatusType = (typeof InviteStatus)[keyof typeof InviteStatus];

export interface ISendInvitePayload {
  email: string;
  context: IGetTenantContentRes;
}

export interface ISendInviteEmailPayload {
  email: string;
  recipientName: string;
  name: string;
  inviterName: string;
  token: string;
}

export interface IAcceptInvitePayload {
  token: string;
  name: string;
  password: string;
  context: IGetTenantContentRes;
}

export interface ICancelPayload {
  id: number;
  tenantId: number;
  userId: number;
}
