import { BaseRepository } from "@/common/repo/base.repository.js";
import { buildSearchCondition } from "@/common/utils/search.util.js";
import { getSearchQuery } from "@/utils/string.util.js";
import { col, Op, Transaction, where } from "sequelize";
import {
  IGetBYIdCurrentBill,
  IGetCurrentBills,
} from "./currentBill.interface.js";
import { CurrentBill } from "./currentBill.model.js";

class CurrentBillRepository extends BaseRepository<CurrentBill> {
  constructor() {
    super(CurrentBill);
  }
  async getMemberCurrentBills({
    tenantId,
    month,
    year,
    query,
  }: IGetCurrentBills) {
    const search = getSearchQuery(query);
    return this.paginate(
      {
        where: {
          tenantId,
          month,
          year,
        },
        include: [
          {
            association: "member",
            attributes: ["id", "name", "avatar", "email"],
            required: Boolean(search),
            where: buildSearchCondition(["name", "email"], search),
          },
          {
            association: "creator",
            attributes: ["id", "name", "avatar", "email"],
          },
        ],
        order: [["userId", "ASC"]],
      },
      query,
    );
  }

  async getByIdMemberCurrentBill({
    tenantId,
    userId,
    year,
  }: IGetBYIdCurrentBill) {
    return await this.findAll({
      where: {
        tenantId,
        userId,
        year,
      },
      include: [
        {
          association: "member",
          attributes: ["id", "name", "avatar", "email"],
        },
        {
          association: "creator",
          attributes: ["id", "name", "avatar", "email"],
        },
      ],
      order: [["month", "DESC"]],
    });
  }
  // paranoid: false makes soft deleted rows visible, which restore needs.
  // With a transaction, the row is locked so two restores cannot run together.
  async findByIdIncludingDeleted(
    { id, tenantId }: { id: number; tenantId: number },
    transaction?: Transaction,
  ) {
    return this.findOneWithOptions({
      where: { id, tenantId },
      paranoid: false,
      ...(transaction && {
        transaction,
        lock: transaction.LOCK.UPDATE,
      }),
    });
  }

  async getDeletedCurrentBills(tenantId: number) {
    return this.findAll({
      where: {
        [Op.and]: [
          { tenantId },
          // "IS NOT" with null makes Sequelize write: deleted_at IS NOT NULL
          where(col("CurrentBill.deleted_at"), "IS NOT", null),
        ],
      },
      paranoid: false,
      include: [
        {
          association: "member",
          attributes: ["id", "name", "avatar", "email"],
        },
        {
          association: "creator",
          attributes: ["id", "name", "avatar", "email"],
        },
      ],
      order: [[col("CurrentBill.deleted_at"), "DESC"]],
    });
  }

  // Deletes in batches, so one huge delete never locks the table for long
  async permanentlyDeleteExpiredSoftDeleted(
    cutoffDate: Date,
    batchSize = 500,
  ): Promise<number> {
    if (Number.isNaN(cutoffDate.getTime())) {
      throw new Error("Invalid cutoff date.");
    }

    let total = 0;

    for (;;) {
      const deleted = await this.model.destroy({
        where: where(col("deleted_at"), Op.lte, cutoffDate),
        force: true,
        limit: batchSize,
      });

      total += deleted;

      if (deleted < batchSize) break;
    }

    return total;
  }
}

export const currentBillRepository = new CurrentBillRepository();
