import { BaseRepository } from "@/common/repo/base.repository.js";
import { IGetBYIdCurrentBill, IGetCurrentBills } from "./currentBill.interface.js";
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
      order: [["userId", "DESC"]],
    });
  }

  async getByIdMemberCurrentBill({ tenantId, userId, year }: IGetBYIdCurrentBill) {
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
}

export const currentBillRepository = new CurrentBillRepository();
