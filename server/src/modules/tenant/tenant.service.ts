import { findTenantByIdDB, getAllTenantDB } from "./tenant.repository.js";

import sequelize from "@/configs/db.js";
import { MemberRole, MemberStatus } from "@/constans/index.js";
import { Membership, Tenant } from "@/models/index.js";
import { generateSlug } from "@/utils/generate.slug.js";
import { ApiError } from "@/utils/index.js";
import { TenantPayload } from "./tenant.interface.js";

export const create = async (userId: number, payload: TenantPayload) => {
  const { name } = payload;

  return sequelize.transaction(async (transaction) => {
    const slug = generateSlug(name);

    const exists = await Tenant.findOne({
      where: { slug },
      transaction,
    });

    if (exists) {
      throw new ApiError(409, "Tenant slug already exists");
    }

    const existingMembership = await Membership.findOne({
      where: {
        userId,
        role: MemberRole.MANAGER,
      },
    });

    if (existingMembership) {
      throw new ApiError(409, "One user can own only one mess");
    }
    const tenant = await Tenant.create(
      {
        name,
        slug,
      },
      { transaction },
    );

    const membership = await Membership.create(
      {
        userId,
        tenantId: tenant.id,
        role: MemberRole.ADMIN,
        status: MemberStatus.ACTIVE,
      },
      { transaction },
    );

    return {
      message: "Tenant create successfully",
      data: {
        tenant,
        membership,
      },
    };
  });
};

export const getTenantService = async (id: number) => {
  const tenant = await findTenantByIdDB(id);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return tenant;
};

export const getTenantsService = async () => {
  return getAllTenantDB();
};
