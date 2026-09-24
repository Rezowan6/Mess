import { BaseRepository } from "@/common/repo/base.repository.js";
import { Attributes, CreationAttributes, Transaction } from "sequelize";
import { EggRate } from "./eggRate.model.js";

class EggRateRepository extends BaseRepository<EggRate> {
  constructor() {
    super(EggRate);
  }

  async createEggRate(
    data: CreationAttributes<EggRate>,
    transaction?: Transaction | null,
  ): Promise<EggRate> {
    return this.createWithOptions(data, {
      ...(transaction ? { transaction } : {}),
    });
  }

  async getEggRate(
    tenantId: number,
  ): Promise<EggRate | null> {
    return this.findOne({
      tenantId,
    });
  }

  async updateEggRate(
    tenantId: number,
    data: Partial<Attributes<EggRate>>,
    transaction?: Transaction | null,
  ): Promise<[number]> {
    return this.update(
      {
        tenantId,
      },
      data,
      {
        ...(transaction ? { transaction } : {}),
      },
    );
  }

  async deleteEggRate(
    tenantId: number,
    transaction?: Transaction | null,
  ): Promise<number> {
    return this.delete(
      {
        tenantId,
      },
      {
        ...(transaction ? { transaction } : {}),
      },
    );
  }
}

export const eggRateRepository = new EggRateRepository();
