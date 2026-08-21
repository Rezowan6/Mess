import { BaseRepository } from "@/common/repo/base.repository.js";
import { PartyExpense } from "@/models/index.js";

export class PartyExpenseRepository extends BaseRepository<PartyExpense> {
  constructor() {
    super(PartyExpense);
  }
}

export const partyExpenseRepository = new PartyExpenseRepository();
