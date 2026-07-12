import { MemberStatus } from "@/constans/index.js";
import { TenantMembership, User } from "@/models/index.js";
import { Transaction } from "sequelize";
import {
  FindByTenantAndUserPayload,
  MembershipCreationAttributes,
  updateRoleDTO,
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

  static async findByTenantAndActiveUser(
    { tenantId, userId }: FindByTenantAndUserPayload,
    transaction: Transaction | null = null,
  ) {
    return (
      (await TenantMembership.findOne({
        where: { tenantId, userId, status: MemberStatus.ACTIVE },
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

  static async updateRole(
    data: updateRoleDTO,
    trnasaction: Transaction | null = null,
  ) {
    const { newRole: role, targetMembershipId: id } = data;
    return await TenantMembership.update(
      { role },
      {
        where: {
          userId: id,
        },
        transaction: trnasaction ?? null,
      },
    );
  }

  static async delete(id: number) {
    return TenantMembership.destroy({
      where: { userId: id },
    });
  }

  static async countByTenant(id: number) {
    return await TenantMembership.count({ where: { tenantId: id } });
  }
}
