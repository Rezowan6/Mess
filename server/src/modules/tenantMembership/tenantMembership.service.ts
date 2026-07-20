import { IPaginationQuery } from "@/common/types/pagination.interface.js";
import { MemberRole } from "@/constans/index.js";
import { ApiError } from "@/utils/ApiError.js";
import {
  IDeleteMemberPayload,
  IUpdateRolePayload,
} from "./tenantMembership.interface.js";
import { membershipRepository } from "./tenantMembership.repository.js";

export class TenantMembershipService {
  async getMembers(tenantId: number, query: IPaginationQuery) {
    const members = await membershipRepository.findOne({ tenantId });

    if (!members) {
      throw new ApiError(404, "Member not found.");
    }
    const result = await membershipRepository.getMembers(tenantId, query);
    
    return result;
  }

  async updateRole(payload: IUpdateRolePayload) {
    const { tenantId, currentMembershipId, id, role } = payload;
    if (role === MemberRole.ADMIN) {
      throw new ApiError(400, "The admin role cannot be assigned.");
    }

    const targetMember = await membershipRepository.findById(id);

    if (!targetMember) {
      throw new ApiError(404, "Member not found");
    }

    if (targetMember.tenantId !== tenantId) {
      throw new ApiError(403, "Access denied");
    }

    if (targetMember.role === MemberRole.ADMIN) {
      throw new ApiError(403, "Admin role connot be update");
    }

    if (currentMembershipId === id) {
      throw new ApiError(400, "You cannot change your own role");
    }
    return await membershipRepository.update({ id }, { role });
  }

  async deleteMember(payload: IDeleteMemberPayload) {
    const { tenantId, currentMembershipId, targetMembershipId: id } = payload;

    const targetMember = await membershipRepository.findById(id);

    if (targetMember?.tenantId !== tenantId) {
      throw new ApiError(403, "Access denied");
    }

    if (targetMember.id === currentMembershipId) {
      throw new ApiError(400, "You cannot remove yourself.");
    }

    if (targetMember.role === MemberRole.ADMIN) {
      throw new ApiError(403, "The admin cannot be removed.");
    }
    if (targetMember.role === MemberRole.MANAGER) {
      throw new ApiError(403, "The manager cannot be removed.");
    }

    const count = await membershipRepository.countByTenant(tenantId);
    if (count === 1) {
      throw new ApiError(
        400,
        "The last member of the tenant cannot be removed.",
      );
    }

    await membershipRepository.delete({ id });
  }
}

export const membershipService = new TenantMembershipService();
