import { MemberStatus } from "@/constans/index.js";
import { TenantMembership, User } from "@/models/index.js";
import { Transaction } from "sequelize";
import {
  FindByTenantAndUserPayload,
  MembershipCreationAttributes,
} from "./tenantMembership.interface.js";

export class TenantMembershipRepository {
  static async findActiveByUserId(userId: number) {
    return (
      (await TenantMembership.findOne({
        where: {
          userId,
          status: MemberStatus.ACTIVE,
        },
      })) || null
    );
  }

  static async findByTenantAndUser(
    { tenantId, userId }: FindByTenantAndUserPayload,
    transaction: Transaction | null = null,
  ) {
    return (
      (await TenantMembership.findOne({
        where: { tenantId, userId },
        transaction: transaction ?? null,
      })) || null
    );
  }

  static async create(
    data: MembershipCreationAttributes,
    transaction: Transaction | null = null,
  ) {
    return TenantMembership.create(data, {
      transaction: transaction ?? null,
    });
  }

  static async getMembers(tenantId: number) {
    return await TenantMembership.findAll({
      where: { tenantId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }
}
