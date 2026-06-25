import { Model } from "sequelize";

export interface RefreshTokenAttributes {
  id: number;

  userId: number;

  tenantId: number;

  tokenHash: string;

  deviceInfo: string | null;

  ipAddress: string | null;

  userAgent: string | null;

  expiresAt: Date;

  revokedAt: Date | null;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface RefreshTokenCreationAttributes extends Omit<
  RefreshTokenAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export interface RefreshTokenInstance
  extends
    Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>,
    RefreshTokenAttributes {}
