import { MemberStatus } from "@/constans/index.js";
import { Membership } from "@/models/index.js";

export const findActiveByUserId = async (userId: number) => {
  return (
    (await Membership.findOne({
      where: {
        userId,
        status: MemberStatus.ACTIVE,
      },
    })) || null
  );
};

export const findByTenantAndUser = async (tenantId: number, userId: number) => {
  return (await Membership.findOne({ where: { tenantId, userId } })) || null;
};
