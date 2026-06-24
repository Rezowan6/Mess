export type Role = "systemOwner" | "user" | "admin" | "subAdmin" | "messMalik";

export type InviteStatus = "pending" | "verified" | "expired";

export interface IRefreshToken {
  token: string;
  createdAt: Date;
}

export interface Subscription {
  isActive: boolean;
  plan: "monthly";
  startDate?: Date;
  endDate?: Date;
  lastPaymentId?: string;
}

export interface IUserAttributes {
  id: number;
  name?: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: Role;
  tenantId?: number | null;
  createdBy?: number | null;
  isActive: boolean;
  loginAttempts: number;
  lockUntil?: Date;
  lastLogin?: Date;
  inviteStatus: InviteStatus;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
