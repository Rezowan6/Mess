import { MemberStatus } from "@/constans/index.js";
import { Membership } from "@/models/index.js";
import { Transaction } from "sequelize";
import { MembershipCreationAttributes, FindByTenantAndUserPayload } from "./membership.interface.js";

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

export const findByTenantAndUser = async ({tenantId, userId}: FindByTenantAndUserPayload,transaction: Transaction | null = null ) => {
  return (await Membership.findOne({ where: { tenantId, userId }, transaction: transaction ?? null })) || null;
};

export const create = async (
  data: MembershipCreationAttributes,
  transaction: Transaction | null = null,
) => {
  return Membership.create(data, {
    transaction: transaction ?? null,
  });
};
