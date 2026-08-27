import { BaseRepository } from "@/common/repo/base.repository.js";
import { User } from "@/models/index.js";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async updateAvatar(userId: number, avatar: string) {
    return this.update({ id: userId }, { avatar });
  }
}

export const userRepository = new UserRepository();
