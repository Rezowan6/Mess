import { BaseRepository } from "@/common/repo/base.repository.js";
import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { Attributes, CreationAttributes, Op, Transaction } from "sequelize";
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

  async getAllEggs(tenantId: number, mealSessionId: number): Promise<Egg[]> {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
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
