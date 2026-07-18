import { BaseRepository } from "@/common/base.repository.js";
import { Tenant } from "@/models/index.js";

class TenantRepository extends BaseRepository<Tenant> {
  constructor() {
    super(Tenant);
  }
}

export const tenantRepository = new TenantRepository();


