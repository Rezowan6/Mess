import { BaseRepository } from "@/common/repo/base.repository.js";
import { SettlementConfirmation } from "@/models/index.js";

class SettlementConfirmationRepository extends BaseRepository<SettlementConfirmation> {
  constructor() {
    super(SettlementConfirmation);
  }
}

export const settlementConfirmationRepository =
  new SettlementConfirmationRepository();
