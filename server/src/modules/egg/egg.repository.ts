import { BaseRepository } from "@/common/repo/base.repository.js";
import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { User } from "@/models/index.js";
import {
  Attributes,
  col,
  CreationAttributes,
  fn,
  Op,
  Transaction,
} from "sequelize";
import { Egg } from "./egg.model.js";

class EggRepository extends BaseRepository<Egg> {
  constructor() {
    super(Egg);
  }

  async createEgg(
    data: CreationAttributes<Egg>,
    transaction?: Transaction | null,
  ): Promise<Egg> {
    return this.createWithOptions(data, {
      ...(transaction ? { transaction } : {}),
    });
  }

  async getMemberEggs(
    tenantId: number,
    mealSessionId: number,
    memberId: number,
  ): Promise<Egg[]> {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
        memberId,
      },
      order: [["eggDate", "ASC"]],
    });
  }

  async getEggSummary(tenantId: number, mealSessionId: number): Promise<any[]> {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      attributes: [
        "tenantId",
        "mealSessionId",
        "memberId",
        [fn("SUM", col("quantity")), "quantity"],
      ],
      include: [
        {
          model: User,
          as: "member",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
      group: ["tenantId", "mealSessionId", "memberId", "member.id"],
      order: [["memberId", "ASC"]],
    });
  }

  async getTotalEggQuantity(
    tenantId: number,
    mealSessionId: number,
  ): Promise<number> {
    const result = await this.findOneWithOptions({
      where: {
        tenantId,
        mealSessionId,
      },
      attributes: [[fn("SUM", col("quantity")), "totalQuantity"]],
      raw: true,
    });

    return Number((result as any)?.totalQuantity ?? 0);
  }

  async getMemberTotalEggQuantity(
    tenantId: number,
    mealSessionId: number,
    memberId: number,
  ): Promise<number> {
    const result = await this.findOneWithOptions({
      where: {
        tenantId,
        mealSessionId,
        memberId,
      },
      attributes: [[fn("SUM", col("quantity")), "totalQuantity"]],
      raw: true,
    });

    return Number((result as any)?.totalQuantity ?? 0);
  }

  async getAllEggs(tenantId: number, mealSessionId: number): Promise<Egg[]> {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      include: [
        {
          model: User,
          as: "member",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
      order: [["eggDate", "ASC"]],
    });
  }

  async getEggByDate(
    tenantId: number,
    mealSessionId: number,
    memberId: number,
    eggDate: Date,
  ): Promise<Egg | null> {
    const { start, end } = getRangeTime(eggDate);

    return this.findOneWithOptions({
      where: {
        tenantId,
        mealSessionId,
        memberId,
        eggDate: {
          [Op.between]: [start, end],
        },
      },
    });
  }

  async updateEgg(
    id: number,
    tenantId: number,
    mealSessionId: number,
    data: Partial<Attributes<Egg>>,
    transaction?: Transaction | null,
  ): Promise<[number]> {
    return this.update(
      {
        id,
        tenantId,
        mealSessionId,
      },
      data,
      {
        ...(transaction ? { transaction } : {}),
      },
    );
  }

  async deleteEgg(
    id: number,
    tenantId: number,
    mealSessionId: number,
    transaction?: Transaction | null,
  ): Promise<number> {
    return this.delete(
      {
        id,
        tenantId,
        mealSessionId,
      },
      {
        ...(transaction ? { transaction } : {}),
      },
    );
  }
}

export const eggRepository = new EggRepository();
