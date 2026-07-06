import sequelize from "@/configs/db.js";
import { MemberRole } from "@/constans/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { UpdateRolePayload } from "./tenantMembership.interface.js";
import { TenantMembershipRepository } from "./tenantMembership.repository.js";

export class TenantMembershipService {
  static async getMembers(tenantId: number) {
    return await TenantMembershipRepository.getMembers(tenantId);
  }

  static async updateRole(payload: UpdateRolePayload) {
    const {
      tenantId,
      currentMembershipId,
      targetMembershipId,
      newRole,
    } = payload;
    return await sequelize.transaction(async (trnasaction) => {

      if(newRole === MemberRole.ADMIN) {
        throw new ApiError(400, "The admin role cannot be assigned.");
      }

      const targetMember =
        await TenantMembershipRepository.findActiveByUserId(targetMembershipId);

      if (!targetMember) {
        throw new ApiError(404, "Member not found");
      }

      if (targetMember.tenantId !== tenantId) {
        throw new ApiError(403, "Access denied");
      }

      if (targetMember.role === MemberRole.ADMIN) {
        throw new ApiError(403, "Admin role connot be update");
      }

      if (currentMembershipId === targetMembershipId) {
        throw new ApiError(400, "You cannot change your own role");
      }
      return await TenantMembershipRepository.updateRole(
        { targetMembershipId, newRole },
        trnasaction,
      );
    });
  }
}
