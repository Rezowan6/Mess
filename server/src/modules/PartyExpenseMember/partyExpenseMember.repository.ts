import { BaseRepository } from "@/common/repo/base.repository.js";
import { PartyExpenseMember } from "@/models/index.js";

export class PartyExpenseMemberRepository extends BaseRepository<PartyExpenseMember> {
  constructor() {
    super(PartyExpenseMember);
  }
}

export const partyExpenseMemberRepository = new PartyExpenseMemberRepository();
