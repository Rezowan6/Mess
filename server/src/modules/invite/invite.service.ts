import { hashToken } from "@/utils/hash.util.js";
import crypto from "crypto";
import { findUserByEmail } from "../auth/auth.repository.js";
import { InviteStatus } from "./invite.interface.js";
import Invite from "./invite.model.js";
import { CreateInvitePayload } from "./invite.validation.js";

/* --------------------------------
   CREATE INVITE SERVICE
---------------------------------*/
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

  return {
    message: "Invite created successfully",
    data: {
      invite,
      rawToken,
    },
  };
};
