// findPendingByEmailAndTenant(email, tenantId)
// findValidByTokenHash(tokenHash)
// create(payload)
// markAccepted(id)
// markRevoked(id)

import { Invite } from "@/models/index.js";
import { Transaction } from "sequelize";
import { CreateInvitePayload } from "./invite.interface.js";

export const findPendingByEmailAndTenant = async (
  email: string,
  tenantId: number,
) => {
  return (await Invite.findOne({ where: { email, tenantId } })) || null;
};

export const create = async (
  payload: CreateInvitePayload,
  transaction: Transaction,
) => {
  return await Invite.create(payload, { transaction });
};
