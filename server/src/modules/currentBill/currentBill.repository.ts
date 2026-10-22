import { BaseRepository } from "@/common/repo/base.repository.js";
import { Transaction } from "sequelize";
import {
  IGetBYIdCurrentBill,
  IGetCurrentBills,
} from "./currentBill.interface.js";
import { CurrentBill } from "./currentBill.model.js";

class CurrentBillRepository extends BaseRepository<CurrentBill> {
  constructor() {
    super(CurrentBill);
  }
  async getMemberCurrentBills({ tenantId, month, year }: IGetCurrentBills) {
    return await this.findAll({
      where: {
        tenantId,
        month,
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
      order: [["userId", "ASC"]],
    });
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
      where: { tenantId },
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
      order: [["deletedAt", "DESC"]],
    }).then((bills) => bills.filter((bill) => bill.deletedAt !== null));
  }
}

export const currentBillRepository = new CurrentBillRepository();
