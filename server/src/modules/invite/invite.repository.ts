// findPendingByEmailAndTenant(email, tenantId)
// findValidByTokenHash(tokenHash)
// create(payload)
// markAccepted(id)
// markRevoked(id)

import { InviteStatus } from "@/constans/index.js";
import { Invite } from "@/models/index.js";
import { Transaction } from "sequelize";
import { CreateInvitePayload } from "./invite.interface.js";

export class InviteRepository {
  static async findPendingByEmailAndTenant(email: string, tenantId: number) {
    return (await Invite.findOne({ where: { email, tenantId } })) || null;
  }
  /**
   * Create new invite
   */
  static async create(
    payload: CreateInvitePayload,
    transaction: Transaction | null = null,
  ) {
    return await Invite.create(payload, { transaction: transaction ?? null });
  }

  /**
   * Save existing invite instance
   */
  static async save(invite: Invite) {
    return invite.save();
  }

  /**
   * Delete invite
   */
  static async delete(invite: Invite) {
    return invite.destroy();
  }

  static async findById(id: number) {
    return Invite.findByPk(id);
  }

  static async findByToken(tokenHash: string) {
    return Invite.findOne({
      where: {
        tokenHash,
      },
    });
  }

  /**
   * Find pending(active) invite by token
   */
  static async findActiveByToken(tokenHash: string) {
    return Invite.findOne({
      where: {
        tokenHash,
        status: InviteStatus.PENDING,
      },
    });
  }

  /**
   * Find pending invite by email
   */
  static async findPendingByEmail(email: string) {
    return Invite.findOne({
      where: {
        email,
        status: InviteStatus.PENDING,
      },
    });
  }

  /**
   * Update invite status
   */
  static async update(
    invite: Invite,
    data: Partial<Invite>,
    transaction: Transaction | null = null,
  ) {
    Object.assign(invite, data);
    return invite.save({ transaction: transaction ?? null });
  }
}
