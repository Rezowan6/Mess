import { MemberStatus } from "@/constans/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { TenantMembershipRepository } from "./tenantMembership.repository.js";

export const getActiveMember = async ({
  tenantId,
  userId,
}: {
  tenantId: number;
  userId: number;
}) => {
  const member = await TenantMembershipRepository.findByTenantAndActiveUser({
    tenantId,
    userId,
  });

  if (!member) {
    throw new ApiError(404, "Member not found.");
  }

  if (member.status !== MemberStatus.ACTIVE) {
    throw new ApiError(400, "Member is not active.");
  }

  return member;
};
