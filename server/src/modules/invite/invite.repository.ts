import { BaseRepository } from "@/common/base.repository.js";
import { Invite } from "@/models/index.js";

export class InviteRepository extends BaseRepository<Invite> {
  constructor() {
    super(Invite);
  }
}

export const inviteRepository = new InviteRepository();
