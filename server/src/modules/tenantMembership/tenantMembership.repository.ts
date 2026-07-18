import { BaseRepository } from "@/common/base.repository.js";
import { MemberStatus } from "@/constans/index.js";
import { TenantMembership, User } from "@/models/index.js";
import { Transaction } from "sequelize";
import { FindByTenantAndUserPayload } from "./tenantMembership.interface.js";

export class TenantMembershipRepository extends BaseRepository<TenantMembership> {
  constructor() {
    super(TenantMembership);
  }

  async findByActiveUser(
    { tenantId, userId }: FindByTenantAndUserPayload,
    transaction: Transaction | null = null,
  ) {
    return this.findOneWithOptions({
      where: {
        tenantId,
        userId,
        status: MemberStatus.ACTIVE
      },
      transaction: transaction ?? null,
    });
  }

  async getMembers(tenantId: number) {
    return await this.findAll({
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

  async countByTenant(id: number) {
    return this.count({ where: { id } });
  }
}

export const membershipRepository = new TenantMembershipRepository();
