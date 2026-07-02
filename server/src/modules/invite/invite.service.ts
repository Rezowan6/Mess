import sequelize from "@/configs/db.js";
import { env } from "@/configs/env.js";
import { Invite, Tenant } from "@/models/index.js";
import { ApiError, hashPassword, hashToken } from "@/utils/index.js";
import crypto from "crypto";
import { findUserByEmail } from "../auth/auth.repository.js";
import { sendInviteEmail } from "../email/inviteEmail.service.js";
import { createUser } from "../user/user.repository.js";
import { InviteStatus } from "./invite.interface.js";
import { CreateInvitePayload } from "./invite.validation.js";

export const invite = async (
  payload: CreateInvitePayload & {
    tenantId: number;
    createdBy: number;
  },
) => {
  const { email, role, message, maxUses, tenantId, createdBy } = payload;

  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("User already exists for this email");
  }

  const existingInvite = await Invite.findOne({
    where: {
      email,
      tenantId,
      status: InviteStatus.PENDING,
    },
  });

  const tenent = await Tenant.findOne({ where: { ownerId: tenantId } });

  if (existingInvite) {
    throw new Error("Invite already exists for this email");
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const invite = await Invite.create({
    email,
    role,
    message: message ?? null,
    maxUses: maxUses ?? 1,

    tenantId,
    createdBy,
    tokenHash,

    status: InviteStatus.PENDING,
    expiresAt,
    usedCount: 0,
  });

  await sendInviteEmail(
    email,
    `${env.FRONTEND_URL}/accept-invite?token=${rawToken}`,
    tenent?.name,
  );

  return {
    message: "Invite created successfully",
    data: {
      invite,
      rawToken,
    },
  };
};

export const validate = async (token: any) => {
  const tokenHash = hashToken(token);

  const invite = await Invite.findOne({
    where: {
      tokenHash,
      status: InviteStatus.PENDING,
    },
  });

  if (!invite) {
    throw new ApiError(404, "Invalid invite");
  }

  if (invite.expiresAt < new Date()) {
    throw new ApiError(404, "Invite expired");
  }

  if (invite.usedCount >= invite.maxUses) {
    throw new ApiError(404, "Invite already used");
  }

  return {
    message: "Accept invite",
    invite,
  };
};

export const accept = async (token: any, password: string) => {
  const { invite, message } = await validate(token);

  const hashedPassword = await hashPassword(password);

  let result: any;

  await sequelize.transaction(async (transaction: any) => {
    const user = await createUser(
      {
        email: invite.email,
        password: hashedPassword,
        role: invite.role,
        tenantId: invite.tenantId,
      },
      transaction,
    );

    await invite.update({
      status: InviteStatus.ACCEPTED,
      usedCount: invite.usedCount + 1,
      acceptedAt: new Date(),
    });

    result = {
      user,
    };
  });

  return {
    message,
    user: result?.user,
  };
};

export const cancel = async (inviteId: number, tenantId: number) => {
  const invite = await Invite.findOne({
    where: {
      id: inviteId,
      tenantId,
    },
  });

  if (!invite) {
    throw new ApiError(404, "Invite not found");
  }

  if (invite.status === InviteStatus.ACCEPTED) {
    throw new ApiError(400, "Accepted invite cannot be cancelled");
  }

  if (invite.status === InviteStatus.REVOKED) {
    throw new ApiError(400, "Invite already cancelled");
  }

  await invite.update({
    status: InviteStatus.REVOKED,
    revokedAt: new Date(),
  });

  return {
    message:"Invite cancelled successfully"
  }
};
