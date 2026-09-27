import { BaseRepository } from "@/common/repo/base.repository.js";
import { Attributes, CreationAttributes, Transaction } from "sequelize";
import { SoldProduct } from "./soldProduct.model.js";

class SoldProductRepository extends BaseRepository<SoldProduct> {
  constructor() {
    super(SoldProduct);
  }

  async createSoldProduct(
    data: CreationAttributes<SoldProduct>,
    transaction?: Transaction | null,
  ): Promise<SoldProduct> {
    return this.createWithOptions(data, {
      ...(transaction ? { transaction } : {}),
    });
  }

  async getSoldProduct(
    tenantId: number,
    mealSessionId: number,
  ): Promise<SoldProduct | null> {
    return this.findOne({
      tenantId,
      mealSessionId,
    });
  }

  async updateSoldProduct(
    tenantId: number,
    mealSessionId: number,
    data: Partial<Attributes<SoldProduct>>,
    transaction?: Transaction | null,
  ): Promise<[number]> {
    return this.update(
      {
        tenantId,
        mealSessionId,
      },
      data,
      {
        ...(transaction ? { transaction } : {}),
      },
    );
  }

  async deleteSoldProduct(
    tenantId: number,
    mealSessionId: number,
    transaction?: Transaction | null,
  ): Promise<number> {
    return this.delete(
      {
        tenantId,
        mealSessionId,
      },
      {
        ...(transaction ? { transaction } : {}),
        force: true,
      },
    );
  }
}

export const soldProductRepository = new SoldProductRepository();
