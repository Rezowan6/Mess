import { BaseRepository } from "@/common/repo/base.repository.js";
import { Settlement } from "@/models/index.js";

class SettlementRepository extends BaseRepository<Settlement> {
  constructor() {
    super(Settlement);
  }
}

export const settlementRepository = new SettlementRepository();
