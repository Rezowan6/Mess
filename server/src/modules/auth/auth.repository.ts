import { Tenant, TenantMembership } from "@/models/index.js";
import { UserRepository } from "../user/user.repository.js";

class AuthRepository extends UserRepository {
  findUserByEmail = async (email: string) => {
    return await this.findOne({ email });
  };

  async getMeById(userId: number) {
    return await this.findByIdWithOptions(userId, {
      attributes: ["id", "name", "email", "avatar"],
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
