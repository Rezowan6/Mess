import { Membership, Tenant, User } from "@/models/index.js";
import { RequestContext } from "@/types/requestContext.js";

export const INVITE_STATUS = [
  "pending",
  "accepted",
  "expired",
  "revoked",
  "cancelled",
] as const;

export type InviteStatus = (typeof INVITE_STATUS)[number];
export type InviteStatusType = (typeof INVITE_STATUS)[number];

export interface SendInvitePayload {
  email: string;
  context: RequestContext
}

export interface SendInviteEmailPayload {
  email: string;
  recipientName: string;
  messName: string;
  inviterName: string;
  token: string;
}

export interface CreateInvitePayload {
  email: string;
  tokenHash: string;
  tenantId: number;
  createdBy: number;
  expiresAt: Date;
}

export interface AcceptInvitePayload {
  token: string;
  password: string;
  context: RequestContext;
}