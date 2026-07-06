import { TenantMembershipRepository } from "./tenantMembership.repository.js";

export class TenantMembershipService {
  static async getMembers(tenantId: number) {
    return await TenantMembershipRepository.getMembers(tenantId);
  }
}
