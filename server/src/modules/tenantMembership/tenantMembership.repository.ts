import { BaseRepository } from "@/common/repo/base.repository.js";
import { MemberStatus } from "@/constans/index.js";
import { TenantMembership, User } from "@/models/index.js";
import { Op, Transaction } from "sequelize";
import { FindByTenantAndUserPayload } from "./tenantMembership.interface.js";

import type { IPaginationQuery } from "@/types/pagination.interface.js";

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

  // async getMemberss(tenantId: number, query: IPaginationQuery) {
  //   return await this.paginate(
  //     {
  //       where: {
  //         tenantId,
  //         ...buildSearchCondition(["name", "email"], query.search),
  //       },
  //       include: [
  //         {
  //           model: User,
  //           as: "user",
  //           attributes: ["id", "name", "email", "avatar"],
  //         },
  //       ],
  //       order: [["createdAt", "ASC"]],
  //     },
  //     query,
  //   );
  // }

  async getMembers(tenantId: number, query: IPaginationQuery) {
    const userInclude = {
      model: User,

      as: "user",

      attributes: ["id", "name", "email", "avatar"],

      required: !!query.search,

      ...(query.search && {
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${query.search}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${query.search}%`,
              },
            },
          ],
        },
      }),
    };
    return this.paginate(
      {
        where: {
          tenantId,
        },

        include: [userInclude],

        order: [["createdAt", "ASC"]],
      },

      query,
    );
  }

  async getAllMembers(tenantId: number) {
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
