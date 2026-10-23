import { BaseRepository } from "@/common/repo/base.repository.js";
import { MemberStatus } from "@/constans/index.js";
import { TenantMembership, User } from "@/models/index.js";
import { Op, Transaction } from "sequelize";
import {
  FindByTenantAndUserPayload,
  MemberShipRole,
} from "./tenantMembership.interface.js";

import type { IPaginationQuery } from "@/types/pagination.interface.js";
import { getSearchQuery } from "@/utils/string.util.js";
import { buildSearchCondition } from "@/common/utils/search.util.js";

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
        status: MemberStatus.ACTIVE,
      },
      transaction: transaction ?? null,
    });
  }

async getMembers(tenantId: number, query: IPaginationQuery) {
  const search = getSearchQuery(query);

  const userInclude = {
    model: User,
    as: "user",
    attributes: ["id", "name", "email", "avatar"],
    required: Boolean(search),
    where: buildSearchCondition(["name", "role", "email"], search),
  };

  return this.paginate(
    {
      where: {
        tenantId,
      },
      include: [userInclude],
      order: [["id", "ASC"]],
    },
    query,
  );
}

  async getAllMembers(tenantId: number, search?: string) {
    return await this.findAll({
      where: {
        tenantId,
        status: MemberStatus.ACTIVE,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "avatar"],

          required: !!search,

          ...(search && {
            where: {
              [Op.or]: [
                {
                  name: {
                    [Op.like]: `%${search}`,
                  },
                },
                {
                  email: {
                    [Op.like]: `%${search}%`,
                  },
                },
              ],
            },
          }),
        },
      ],
      order: [["id", "ASC"]],
    });
  }

  async countByTenant(id: number) {
    return this.count({ where: { tenantId: id } });
  }

  async countByTenantAndRole(
    tenantId: number,
    role: MemberShipRole,
    transaction: Transaction,
  ): Promise<number> {
    return this.count({
      where: { tenantId, role },
      transaction,
    });
  }
}

export const membershipRepository = new TenantMembershipRepository();
