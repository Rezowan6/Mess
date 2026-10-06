import { BaseRepository } from "@/common/repo/base.repository.js";
import { TenantStatus } from "@/constans/index.js";
import { Tenant } from "@/models/index.js";
import { Transaction } from "sequelize";

class TenantRepository extends BaseRepository<Tenant> {
  constructor() {
    super(Tenant);
  }
  async getActiveTenants() {
    return this.findAll({
      where: {
        status: TenantStatus.ACTIVE,
      },
    });
  }
  async findByIdForUpdate(id: number | string, transaction: Transaction) {
    return Tenant.findByPk(id, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
  }
}

export const tenantRepository = new TenantRepository();
