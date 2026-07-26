import { BaseRepository } from "@/common/repo/base.repository.js";
import { TenantStatus } from "@/constans/index.js";
import { Tenant } from "@/models/index.js";

class TenantRepository extends BaseRepository<Tenant> {
  constructor() {
    super(Tenant);
  }
  async getActiveTenants() {
    return this.findAll({
      where: {
        status: TenantStatus.ACTIVE
      },
    });
  }
}

export const tenantRepository = new TenantRepository();
