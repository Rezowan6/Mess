import { hashToken } from "@/utils/hash.util.js";
import RefreshToken from "./refreshToken.model.js";

// create refresh token

export const createRefreshToken = async (data: {
  userId: number;
  tenantId: number;
  token: string;
  ipAddress?: string;
  userAgent?: string;
}) => {
  return await RefreshToken.create({
    userId: data.userId,
    tenantId: data.tenantId,
    tokenHash: hashToken(data.token),
    ipAddress: data.ipAddress ?? null,
    userAgent: data.userAgent ?? null,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
};

// revoke token

export const revokeRefreshToken = async (token: string) => {
  const tokenHash = hashToken(token);

  await RefreshToken.update(
    {
      revokedAt: new Date(),
    },

    {
      where: {
        tokenHash,
      },
    },
  );
};

// revoke all device

export const revokeAllUserTokens = async (userId: number) => {
  await RefreshToken.update(
    {
      revokedAt: new Date(),
    },

    {
      where: {
        userId,
        revokedAt: null,
      },
    },
  );
};
