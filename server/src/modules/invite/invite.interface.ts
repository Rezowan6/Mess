export enum InviteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  EXPIRED = "expired",
  REVOKED = "revoked",
}

export enum InviteRole {
  USER = "user",
  ADMIN = "admin",
  SUB_ADMIN = "subAdmin",
  MESS_MALIK = "messMalik",
}

export interface IInviteAttributes {
  id: number;

  email: string;
  token: string;

  role: InviteRole;

  tenantId: number;
  createdBy: number;

  status: InviteStatus;

  expiresAt: Date;

  acceptedAt?: Date | null;
  revokedAt?: Date | null;

  maxUses: number;
  usedCount: number;

  message?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}