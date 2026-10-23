import { BaseRepository } from "@/common/repo/base.repository.js";
import { IGetBYIdKhalaBill, IGetKhalaBills } from "./khalaBill.interface.js";
import { KhalaBill } from "./khalaBill.model.js";

class KhalaBillRepository extends BaseRepository<KhalaBill> {
  constructor() {
    super(KhalaBill);
  }
  async getMemberKhalaBills({ tenantId, month, year }: IGetKhalaBills) {
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

  async getByIdMemberKhalaBill({
    tenantId,
    userId,
    year,
  }: IGetBYIdKhalaBill) {
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

export const khalaBillRepository = new KhalaBillRepository();
