import { findTenantByIdDB, getAllTenantDB } from "./tenant.repository.js";

import { Tenant } from "@/models/index.js";
import { generateSlug } from "@/utils/generate.slug.js";
import sequelize from "@/configs/db.js";

export const createTenantService = async (userId: number, messName: string) => {
  return sequelize.transaction(async (transaction) => {
    const tenant = await Tenant.create(
      {
        messName,
        slug: generateSlug(messName),
        isActive: true,
        plan: "free",
        ownerId: userId,
      },
      {
        transaction,
      },
    );

    return tenant;
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
