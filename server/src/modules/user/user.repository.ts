import { BaseRepository } from "@/common/repo/base.repository.js";
import { User } from "@/models/index.js";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}

export const userRepository = new UserRepository();
