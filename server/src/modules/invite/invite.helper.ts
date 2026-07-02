import crypto from "crypto";
import {env, hashToken, sendInviteEmail} from "./index.js";

export const generateInviteToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");

  return {
    rawToken,
    tokenHash: hashToken(rawToken),
  };
};

export const generateInviteExpiry = (hours = 24) => {
  const expiresAt = new Date();

  expiresAt.setHours(expiresAt.getHours() + hours);

  return expiresAt;
};

export const sendInvite = async (
  email: string,
  tenantName: string,
  rawToken: string,
) => {
  await sendInviteEmail(
    email,
    `${env.FRONTEND_URL}/accept-invite/${rawToken}`,
    tenantName,
  );
};
