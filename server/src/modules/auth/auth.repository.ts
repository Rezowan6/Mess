import { Tenant, TenantMembership, User } from "@/models/index.js";
import { UserRepository } from "../user/user.repository.js";

class AuthRepository extends UserRepository {
  findUserByEmail = async (email: string) => {
    return await this.findOne({ email });
  };

  // Used only by login: needs password + isVerified, so no attribute restriction on User
  async findUserForLogin(email: string) {
    return await User.findOne({
      where: { email },
      include: [
        {
          model: TenantMembership,
          as: "tenantMemberships",
          attributes: ["tenantId", "role", "status"],
          include: [
            {
              model: Tenant,
              as: "tenant",
              attributes: ["id", "name", "slug"],
            },
          ],
        },
      ],
    });
  }

  async getMeById(userId: number) {
    return await this.findByIdWithOptions(userId, {
      attributes: ["id", "name", "email", "avatar", "role"],
      include: [
        {
          model: TenantMembership,
          as: "tenantMemberships",
          attributes: ["tenantId", "role", "status"],

          include: [
            {
              model: Tenant,
              as: "tenant",
              attributes: ["id", "name", "slug"],
            },
          ],
        },
      ],
    });
  }

  deleteUserById = async (id: string) => {
    return await this.delete({ id });
  };
}

export const authRepository = new AuthRepository();
